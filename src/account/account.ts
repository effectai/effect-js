import { Api, Serialize } from 'eosjs'

export class Account {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  getBalance = async (accountName: string): Promise<Array<object>> => {
    try {
      const accString = (this.nameToHex(process.env.EFX_TOKEN_ACCOUNT) + "01" + this.nameToHex(accountName)).padEnd(64, "0");

      const resp = await this.api.rpc.get_table_rows({
          code: process.env.ACCOUNT_CONTRACT,
          scope: process.env.ACCOUNT_CONTRACT,
          index_position: 2,
          key_type: "sha256",
          lower_bound: accString,
          upper_bound: accString,
          table: 'account',
          json: true,
      }).then((data) => {
        return data.rows;
      });

      return resp;
    } catch (err) {
      throw new Error(err)
    }
  }

  nameToHex = (account: string): string => {
    const serialbuff = new Serialize.SerialBuffer();
    serialbuff.pushName(account);
    const bytes = serialbuff.asUint8Array();
    return Serialize.arrayToHex(bytes);
  }

  openAccount = async (account: string): Promise<any> => {
    try {
      const result = await this.api.transact({
        actions: [{
          account: process.env.ACCOUNT_CONTRACT,
          name: 'open',
          authorization: [{
            actor: process.env.EOS_FEE_PAYER,
            permission: 'active',
          }],
          data: {
            // TODO: check if checksum or name, assume name for now
            acc: ["name", account],
            symbol: {contract: process.env.EFX_TOKEN_ACCOUNT, sym: process.env.EFX_EXTENDED_SYMBOL},
            payer: process.env.EOS_FEE_PAYER,
          },
        }]
      },
      {
        blocksBehind: 3,
        expireSeconds: 60
      });
      return result;
    } catch (err) {
      throw new Error(err)
    }
  }

  deposit = async (fromAccount: string, toAccount: string, amount: string): Promise<any> => {
    try {      
      // TODO: add filter for EFX only
      const balance: object = await this.getBalance(toAccount)
      const result = await this.api.transact({
        actions: [{
          account: process.env.EFX_TOKEN_ACCOUNT,
          name: 'transfer',
          authorization: [{
            actor: fromAccount,
            permission: 'active',
          }],
          data: {
            from: fromAccount,
            to: process.env.ACCOUNT_CONTRACT,
            quantity: amount,
            memo: balance[0].id,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });
      return result;
    } catch (err) {
      throw new Error(err)
    }
  }

}