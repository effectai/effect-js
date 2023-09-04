import { DefiBoxPair } from './../types/user';
import { Asset, UInt128 } from '@wharfkit/antelope';
import { Client } from '../client';
import { TransactResult } from '@wharfkit/session';

export enum DefiBoxPairEnum {
    EosEfx= 191,
    EosUsdt= 12,
}

export enum swapDirection {
    EfxToUsdt = `${DefiBoxPairEnum.EosEfx}-${DefiBoxPairEnum.EosUsdt}`,
    UsdtToEfx = `${DefiBoxPairEnum.EosUsdt}-${DefiBoxPairEnum.EosEfx}`
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

    async swapOut (amount: number): Promise<TransactResult> {
        try {
            this.client.requireSession()
            const efxPrice = await this.getEfxPrice()
            const valueAmount = efxPrice * amount
            return await this.client.session.transact({
                "action": {
                    "account": "effecttokens",
                    "name": "transfer",
                    "authorization": [
                      {
                        "actor": this.client.session.actor,
                        "permission": this.client.session.permission
                      }
                    ],
                    "data": {
                      "from": this.client.session.actor,
                      "to": "swap.defi",
                      "quantity": Asset.from(amount, '4,EFX'),
                      "memo": `swap,${valueAmount},${swapDirection.EfxToUsdt}`
                    }
                  }
            })
        } catch (error) {
            console.error(error)
            throw new Error('Error swapping out of EFX')
        }
    }

    async swapIn (amount: number): Promise<TransactResult> {
        try {
            this.client.requireSession()
            const efxPrice = await this.getEfxPrice()
            // TODO: make sure if this is correct, doesn't feel right.
            const valueAmount = 1 / efxPrice * amount
            return await this.client.session.transact({
                "action": {
                    "account": "tethertether",
                    "name": "transfer",
                    "authorization": [
                      {
                        "actor": this.client.session.actor,
                        "permission": this.client.session.permission
                      }
                    ],
                    "data": {
                      "from": this.client.session.actor,
                      "to": "swap.defi",
                      "quantity": Asset.from(amount, '4,USDT'),
                      "memo": `swap,${valueAmount},${swapDirection.UsdtToEfx}`
                    }
                  }
            })
        } catch (error) {
            console.error(error)
            throw new Error('Error swapping out of EFX')
        }
    }

}
