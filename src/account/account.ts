import { Api, Serialize } from 'eosjs'

export class Account {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  getBalance = async (accountName: string): Promise<any> => {
    try {
      const accString = (this.nameToHex(process.env.EFX_TOKEN_ACCOUNT) + "01" + this.nameToHex(accountName)).padEnd(64, "0");

      const resp = this.api.rpc.get_table_rows({
          code: process.env.ACCOUNT_CONTRACT,
          scope: process.env.ACCOUNT_CONTRACT,
          index_position: 2,
          key_type: "sha256",
          lower_bound: accString,
          upper_bound: accString,
          table: 'account',
          json: true,
      }).then(function(res) {
          console.log(res);
      });
      
      return resp
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

  // TODO: finish this when get balance is done
  deposit = async (fromAccount: string, amount: string, memo: string): Promise<any> => {
    try {
      const result = await this.api.transact({
        actions: [{
          account: process.env.EFX_TOKEN_ACCOUNT,
          name: 'transfer',
          authorization: [{
            actor: process.env.EOS_FEE_PAYER,
            permission: 'active',
          }],
          data: {
            from: process.env.EOS_FEE_PAYER,
            to: process.env.ACCOUNT_CONTRACT,
            quantity: amount,
            // TODO: memo = account balance index
            memo: "0",
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