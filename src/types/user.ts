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
export interface VAccount {
  id: number;
  nonce: number;
  address: [string, string];
  balance: {
    quantity: string;
    contract: string;
  };
}

export interface efxTicker {
  btc: number;
  eth: number;
  usd: number;
}

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

//TODO:: this type is not complete..
export interface Payment {
  id: number;
  account_id: number;
  batch_id: number;
  last_submission_time: string;
  pending: {
    quantity: string;
    contract: string;
  };
}
