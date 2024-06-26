/**
 * Vaccount Interface, Virtual Account for Effect Network
 * @interface
 * @property {number} id - Vaccount ID
 * @property {number} nonce - Vaccount nonce
 * @property {array} address - Vaccount address ['name', 'eosAccName']
 * @property {string} balance - Vaccount balance
 * @property {string} contract - Vaccount contract
 * @property {string} quantity - Vaccount quantity
 */

export interface DefiBoxPair {
	id: number;
	token0: {
		contract: string;
		symbol: string;
	};
	token1: {
		contract: string;
		symbol: string;
	};
	reserve0: string;
	reserve1: string;
	liquidity_token: number;
	price0_last: string;
	price1_last: string;
	price0_cumulative_last: string;
	price1_cumulative_last: number;
	block_time_last: string;
}
