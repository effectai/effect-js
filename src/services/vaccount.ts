import { type Client } from '../client'
import {
    ABIEncoder,
    Variant,
    Checksum256,
    Struct,
    Checksum160,
    type Asset,
    Name,
    type NameType,
    UInt128
} from '@wharfkit/antelope'
import { type VAccount } from '../types/user'
import { type TransactResult } from '@wharfkit/session'

@Variant.type('vaddress', [Checksum160, Name])
class VAddress extends Variant {
    declare value: Checksum160 | Name
}

@Struct.type('extended_symbol')
class ExtendedSymbol extends Struct {
    static abiName = 'extended_symbol'
    static abiFields = [{ name: 'sym', type: 'symbol' }, { name: 'contract', type: 'name' }]
    constructor (sym: Asset.SymbolType, contract: NameType) {
        super({ sym, contract })
    }
}

export class VAccountService {
    constructor (private readonly client: Client) {}

    async vtransfer (from_id: number, to_id: number, quantity: string): Promise<TransactResult> {
        const transferAction = {
            account: this.client.config.vaccountContract,
            name: 'vtransfer',
            authorization: [this.client.session.permissionLevel],
            data: {
                from_id,
                to_id,
                quantity: {
                    quantity,
                    contract: this.client.config.tokenContract
                },
                memo: '',
                payer: this.client.session.actor,
                sig: null,
                fee: null
            }
        }
        return await this.client.session.transact({ action: transferAction })
    }

    async open (): Promise<TransactResult> {
        const conf = this.client.config
        const action = {
            account: conf.vaccountContract,
            name: 'open',
            authorization: [this.client.session.permissionLevel],
            data: {
                acc: VAddress.from(Name.from(this.client.session.actor.toString())),
                symbol: new ExtendedSymbol('4,EFX', conf.tokenContract),
                payer: this.client.session.actor
            }
        }
        return await this.client.session.transact({ action })
    }

    /**
     * Get vAccount row of the configured account and token contract
     * @returns {Promise<VAccount>}
     */
    async get (): Promise<VAccount> {
        const { conf, keycs } = this.generateCheckSumForVAccount()
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: conf.vaccountContract,
            table: 'account',
            scope: conf.vaccountContract,
            upper_bound: keycs,
            lower_bound: keycs,
            index_position: 'secondary',
            key_type: 'sha256'
        })
        return response.rows.find((row: VAccount) => row.balance.contract === conf.tokenContract)
    }

    /**
     * Get all VAccount rows of the configured account and token contract
     */
    async getAll (): Promise<VAccount[]> {
        try {
            const { conf, keycs } = this.generateCheckSumForVAccount()
            const response = await this.client.eos.v1.chain.get_table_rows({
                code: conf.vaccountContract,
                table: 'account',
                scope: conf.vaccountContract,
                upper_bound: keycs,
                lower_bound: keycs,
                index_position: 'secondary',
                key_type: 'sha256'
            })
            return response.rows
        } catch (error) {
            console.error(error)
            throw new Error('Error retrieving VAccount')
        }
    }

    /**
     * TODO: Figure out return type
     * get pending balance
     * @param accountId ID of  the given acccount
     * @returns the payment rows of the given `accountId`
     */
    getPendingPayout = async (accountId: number): Promise<any> => {
        const response = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.tasksContract,
            scope: this.client.config.tasksContract,
            table: 'payment',
            index_position: 'tertiary',
            key_type: 'i64',
            lower_bound: UInt128.from(accountId),
            upper_bound: UInt128.from(accountId)
        })
        console.debug(response)
        return response
    }

    /**
   * TODO: Define tests for this method
   * Receive tokens from completed tasks.
   * @param paymentId
   * @returns
   */
    payout = async (): Promise<TransactResult> => {
        this.client.requireSession()

        const actions = [] as any
        const vacc = await this.get()
        const settings = await this.client.tasks.getForceSettings()
        const payments = await this.getPendingPayout(vacc.id)

        if (payments !== undefined && payments.rows.length > 0) {
            for (const payment of payments.rows) {
                // payout is only possible after x amount of days have passed since the last_submission_time
                if (((new Date(`${new Date(payment.last_submission_time)}UTC`).getTime() / 1000) + settings.payout_delay_sec < ((Date.now() / 1000)))) {
                    actions.push({
                        account: this.client.config.tasksContract,
                        name: 'payout',
                        authorization: [{
                            actor: this.client.session.actor,
                            permission: this.client.session.permission
                        }],
                        data: {
                            payment_id: payment.id
                        }
                    })
                }
            }
        } else {
            throw new Error('No pending payouts found')
        }
        return await this.client.session.transact({ actions })
    }

    /**
     * Generate checkSum for vaccount
     */
    generateCheckSumForVAccount () {
        const conf = this.client.config
        const enc = new ABIEncoder(32)
        Name.from(conf.tokenContract).toABI(enc)
        const vaddr = VAddress.from(Name.from(this.client.session.actor.toString()))
        enc.writeByte(vaddr.variantIdx)
        vaddr.value.toABI(enc)

        const key = enc.getBytes().hexString
        const arr = new Uint8Array(32)
        arr.set(enc.getData(), 0)
        const keycs = Checksum256.from(arr)

        return { conf, keycs }
    }
};
