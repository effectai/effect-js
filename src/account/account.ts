import { Api, Serialize } from 'eosjs'

export class Account {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Get the balance from a vaccount
   * @param accountName - name of the account
   * @returns - balance object of
   */
  getBalance = async (accountName: string): Promise<Array<object>> => {
    try {
      // TODO: add filter for EFX balances only
      // TODO: check if address or name, assume name for now
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

  /**
   * Open a vaccount
   * @param account - name of the account to open
   * @returns 
   */
  openAccount = async (account: string): Promise<object> => {
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

  /**
   * Deposit from account to vaccount
   * @param fromAccount - account to deposit from
   * @param toAccount - account to deposit to
   * @param amount - amount, example: '10.0000'
   * @returns 
   */
  deposit = async (fromAccount: string, toAccount: string, amount: string): Promise<object> => {
    try {
      const balance: object = await this.getBalance(toAccount)
      const balanceIndexTo: number = balance[0].id
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
            quantity: amount + ' ' + process.env.EFX_SYMBOL,
            memo: balanceIndexTo,
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

  /**
   * Withdraw from vaccount to account
   * @param fromAccount - vaccount to withdraw from
   * @param toAccount - account to withdraw to
   * @param amount - amount, example: '10.0000'
   * @param memo - optional memo
   * @returns 
   */
  withdraw = async (fromAccount: string, toAccount: string, amount: string, memo?: string): Promise<object> => {
    const balance: object = await this.getBalance(fromAccount)
    const balanceIndexFrom: number = balance[0].id
    console.log('fromaccount', fromAccount);
    console.log('toaccount', toAccount);
    console.log('balance', balance[0]);
    try {
      const result = await this.api.transact({
        actions: [{
          account: process.env.ACCOUNT_CONTRACT,
          name: 'withdraw',
          authorization: [{
            actor: fromAccount,
            permission: 'active',
          }],
          data: {
            from_id: balanceIndexFrom,
            to_account: toAccount,
            quantity: {
              quantity: amount + ' ' + process.env.EFX_SYMBOL,
              contract: process.env.EFX_TOKEN_ACCOUNT
            },
            memo: memo,
            sig: null,
            fee: null
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

  /**
   * Transfer between vaccounts
   * @param fromAccount - vaccount to transfer from
   * @param toAccount - vaccount to transfer to
   * @param amount - amount, example: '10.0000'
   * @returns 
   */
  vtransfer = async (fromAccount: string, toAccount: string, amount: string): Promise<object> => {
    const balanceFrom: object = await this.getBalance(fromAccount)
    const balanceIndexFrom: number = balanceFrom[0].id
    const balanceTo: object = await this.getBalance(toAccount)
    const balanceIndexTo: number = balanceTo[0].id
    try {
      const result = await this.api.transact({
        actions: [{
          account: process.env.ACCOUNT_CONTRACT,
          name: 'vtransfer',
          authorization: [{
            actor: fromAccount,
            permission: 'active',
          }],
          data: {
            from_id: balanceIndexFrom,
            to_id: balanceIndexTo,
            quantity: {
              quantity: amount + ' ' + process.env.EFX_SYMBOL,
              contract: process.env.EFX_TOKEN_ACCOUNT
            },
            sig: null,
            fee: null
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

  /**
   * Convert account name to hex
   */
  nameToHex = (account: string): string => {
    const serialbuff = new Serialize.SerialBuffer();
    serialbuff.pushName(account);
    const bytes = serialbuff.asUint8Array();
    return Serialize.arrayToHex(bytes);
  }

}