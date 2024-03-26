import { DefiBoxPair } from "../types/user";
import { Asset, UInt128 } from "@wharfkit/antelope";
import { Client } from "../client";
import { TransactResult } from "@wharfkit/session";

export enum DefiBoxPairEnum {
    EosEfx = 191,
    EosUsdt = 12,
}

export enum swapDirection {
    EfxToUsdt = `${DefiBoxPairEnum.EosEfx}-${DefiBoxPairEnum.EosUsdt}`,
    UsdtToEfx = `${DefiBoxPairEnum.EosUsdt}-${DefiBoxPairEnum.EosEfx}`,
}

export class TokenService {
    constructor(private client: Client) {}

    /**
     * Returns a DefiBox pair,
     * @param pairEnum DefiBoxPairEnum
     * @returns DefiBoxPair
     */
    async getDefiBoxPair(pairEnum: DefiBoxPairEnum): Promise<DefiBoxPair> {
        try {
            const pairResponse = await this.client.eos.v1.chain.get_table_rows({
                code: "swap.defi",
                scope: "swap.defi",
                table: "pairs",
                limit: 1,
                lower_bound: UInt128.from(pairEnum.valueOf()),
                upper_bound: UInt128.from(pairEnum.valueOf()),
            });
            const [pair] = pairResponse.rows;
            return pair;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving EFX Ticker Price from DefiBox");
        }
    }

    /**
     * Returns the current EFX price in USDT from DefiBox
     * @returns EFX price in USDT
     */
    async getEfxPrice(): Promise<number> {
        try {
            const eosEfxPair = await this.getDefiBoxPair(
                DefiBoxPairEnum.EosEfx,
            );
            const eosUsdtPair = await this.getDefiBoxPair(
                DefiBoxPairEnum.EosUsdt,
            );
            const efxUsdt =
                Number(eosEfxPair.price1_last) *
                Number(eosUsdtPair.price0_last);
            return efxUsdt;
        } catch (error) {
            console.error(error);
            throw new Error("Error retrieving EFX Ticker Price from DefiBox");
        }
    }

    /**
     * Deposit EFX into vaccount
     */
    async deposit(amount: number): Promise<TransactResult> {
        try {
            const { transact, actor, authorization } = this.client.useSession();

            const vacc = await this.client.vaccount.get();
            return await transact({
                action: {
                    account: this.client.config.tokenContract,
                    name: "transfer",
                    authorization,
                    data: {
                        from: actor,
                        to: this.client.config.vaccountContract,
                        quantity: Asset.from(amount, "4,EFX"),
                        memo: `${vacc.id}`,
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error("Error depositing EFX");
        }
    }

    /**
     * TODO
     * Withdraw EFX from vaccount
     */

    /**
     * TODO
     * Claim EFX from vaccount to user
     */

    /**
     * TODO
     * Claim EFX from vaccount to staking account.
     */

    /**
     * Swaps out of EFX into USDT
     * @param amount The amount of EFX to swap out of
     * @returns TransactResult
     */
    async swapOut(amount: number): Promise<TransactResult> {
        try {
            const { transact, actor, authorization } = this.client.useSession();

            const efxPrice = await this.getEfxPrice();
            const valueAmount = efxPrice * amount;

            return await transact({
                action: {
                    account: "effecttokens",
                    name: "transfer",
                    authorization,
                    data: {
                        from: actor,
                        to: "swap.defi",
                        quantity: Asset.from(amount, "4,EFX"),
                        memo: `swap,${valueAmount},${swapDirection.EfxToUsdt}`,
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error("Error swapping out of EFX");
        }
    }

    /**
     * Swaps into EFX from USDT
     * @param amount The amount of USDT to swap into EFX
     * @returns TransactResult
     */
    async swapIn(amount: number): Promise<TransactResult> {
        try {
            const { transact, actor, authorization } = this.client.useSession();

            const efxPrice = await this.getEfxPrice();
            const valueAmount = (1 / efxPrice) * amount;
            return await transact({
                action: {
                    account: "tethertether",
                    name: "transfer",
                    authorization,
                    data: {
                        from: actor,
                        to: "swap.defi",
                        quantity: Asset.from(amount, "4,USDT"),
                        memo: `swap,${valueAmount},${swapDirection.UsdtToEfx}`,
                    },
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error("Error swapping out of EFX");
        }
    }
}
