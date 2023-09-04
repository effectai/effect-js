import { DefiBoxPair } from './../types/user';
import { UInt128 } from '@wharfkit/antelope';
import { Client } from '../client';

export enum DefiBoxPairEnum {
    EosEfx= 191,
    EosUsdt= 12,
}

export class TokenService {
    constructor(private client: Client) {}

    async getDefiBoxPair (pairEnum: DefiBoxPairEnum): Promise<DefiBoxPair> {
        try {
            const pairResponse = await this.client.eos.v1.chain.get_table_rows({
                code: 'swap.defi',
                scope: 'swap.defi',
                table: 'pairs',
                limit: 1,
                lower_bound: UInt128.from(pairEnum.valueOf()),
                upper_bound: UInt128.from(pairEnum.valueOf()),
            })
            const [ pair ] = pairResponse.rows
            console.debug(pair)
            return pair
        } catch (error) {
            console.error(error)
            throw new Error('Error retrieving EFX Ticker Price from DefiBox')
        }
    }

    async getEfxPrice (): Promise<number> {
        try {
            const eosEfxPair = await this.getDefiBoxPair(DefiBoxPairEnum.EosEfx)
            const eosUsdtPair = await this.getDefiBoxPair(DefiBoxPairEnum.EosUsdt)
            const efxUsdt = Number(eosEfxPair.price1_last) * Number(eosUsdtPair.price0_last)
            console.debug('efxUsdt', efxUsdt)
            return efxUsdt
        } catch (error) {
            console.error(error)
            throw new Error('Error retrieving EFX Ticker Price from DefiBox')
        }
    }

}
