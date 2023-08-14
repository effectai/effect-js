import { Client } from '../client';
import {
    ABIEncoder,
    ABIDecoder,
    Variant,
    Checksum256,
    Struct,
    UInt8,
    UInt64,
    UInt32,
    Checksum160,
    Checksum160Type,
    Asset,
    Name,
    NameType,
    Serializer,
} from '@wharfkit/antelope';

@Variant.type('vaddress', [Checksum160, Name])
class VAddress extends Variant {
    declare value: Checksum160 | Name
}

@Struct.type('extended_symbol')
class ExtendedSymbol extends Struct {
    static abiName = 'extended_symbol'
    static abiFields = [{name: 'sym', type: 'symbol'}, {name: 'contract', type: 'name'}]
    constructor(sym: Asset.SymbolType, contract: NameType) {
        super({'sym': sym, 'contract': contract});
    }
}

export class VAccountService {
    constructor(private client: Client) {}

    async vtransfer(from_id: number, to_id: number, quantity: string) {
        const transferAction = {
            account: this.client.config.vaccountContract,
            name: "vtransfer",
            authorization: [this.client.session.permissionLevel],
            data: {
                from_id: from_id,
                to_id: to_id,
                quantity: {
                    quantity: quantity,
                    contract: this.client.config.tokenContract,
                },
                memo: "",
                payer: this.client.session.actor,
                sig: null,
                fee: null,
            },
        }
        return this.client.session.transact({ action: transferAction });
    }

    async open() {
        const conf = this.client.config;
        const action = {
            account: conf.vaccountContract,
            name: "open",
            authorization: [this.client.session.permissionLevel],
            data: {
                acc: VAddress.from(this.client.session.actor),
                symbol: new ExtendedSymbol('4,EFX', conf.tokenContract),
                payer: this.client.session.actor,
            },
        }
        return this.client.session.transact({ action: action });
    }

    /**
     * Get all VAccount rows of the configured account and token contract
     */
    async getAll() {
        const conf = this.client.config;
        let enc = new ABIEncoder(32);
        Name.from(conf.tokenContract).toABI(enc);
        const vaddr = VAddress.from(this.client.session.actor);
        enc.writeByte(vaddr.variantIdx);
        vaddr.value.toABI(enc);

        const key = enc.getBytes().hexString
        let arr = new Uint8Array(32)
        arr.set(enc.getData(), 0)
        const keycs = Checksum256.from(arr);

        return this.client.eos.v1.chain.get_table_rows({
            code: conf.vaccountContract,
            table: 'account',
            scope: conf.vaccountContract,
            upper_bound: keycs,
            lower_bound: keycs,
            index_position: 'secondary',
            key_type: 'sha256',
        });
    }
};
