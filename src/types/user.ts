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
    btc: number,
    eth: number,
    usd: number
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