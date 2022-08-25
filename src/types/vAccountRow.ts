export interface vAccountRow {
  address: Array<string>;
  balance: {
    quantity: string;
    contract:  string;
  };
  id: number;
  nonce: number;
}