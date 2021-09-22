import { Api, Serialize } from 'eosjs'

export class Account {
  api: Api;
  config: any;

  constructor(api: Api) {
    this.api = api;
    // TODO: replace this with proper config
    this.config = {
      EFX_TOKEN_ACCOUNT:"tokenonkylin",
      EFX_SYMBOL:"UTL",
      EFX_EXTENDED_SYMBOL:"4,UTL",
      EOS_FEE_PAYER:"testjairtest",
      ACCOUNT_CONTRACT:"acckylin1111"
    }
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
      const accString = (this.nameToHex(this.config.EFX_TOKEN_ACCOUNT) + "01" + this.nameToHex(accountName)).padEnd(64, "0");
      const resp = await this.api.rpc.get_table_rows({
          code: this.config.ACCOUNT_CONTRACT,
          scope: this.config.ACCOUNT_CONTRACT,
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
   * @param account - name or address of the account to open, for BSC addresses without 0x
   * @returns
   */
  openAccount = async (account: string, permission: string): Promise<object> => {
    try {
      const type:string = account.length == 40 ? 'address' : 'name';
      const result = await this.api.transact({
        actions: [{
          account: this.config.ACCOUNT_CONTRACT,
          name: 'open',
          authorization: [{
            actor: account,
            permission: permission,
          }],
          data: {
            acc: [type, account],
            symbol: {contract: this.config.EFX_TOKEN_ACCOUNT, sym: this.config.EFX_EXTENDED_SYMBOL},
            payer: account,
          },
        }]
      },
      {
        blocksBehind: 3,
        expireSeconds: 60
      });
      // TODO: send/sign seperate
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
  deposit = async (fromAccount: string, toAccount: string, amount: string, permission: string): Promise<object> => {
    try {
      const balance: object = await this.getBalance(toAccount)
      const balanceIndexTo: number = balance[0].id
      const result = await this.api.transact({
        actions: [{
          account: this.config.EFX_TOKEN_ACCOUNT,
          name: 'transfer',
          authorization: [{
            actor: fromAccount,
            permission: permission,
          }],
          data: {
            from: fromAccount,
            to: this.config.ACCOUNT_CONTRACT,
            quantity: amount + ' ' + this.config.EFX_SYMBOL,
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
  withdraw = async (fromAccount: string, toAccount: string, amount: string, permission: string, memo?: string): Promise<object> => {
    // TODO: BSC withdraw
    const balance: object = await this.getBalance(fromAccount)
    const balanceIndexFrom: number = balance[0].id
    try {
      const result = await this.api.transact({
        actions: [{
          account: this.config.ACCOUNT_CONTRACT,
          name: 'withdraw',
          authorization: [{
            actor: fromAccount,
            permission: permission,
          }],
          data: {
            from_id: balanceIndexFrom,
            to_account: toAccount,
            quantity: {
              quantity: amount + ' ' + this.config.EFX_SYMBOL,
              contract: this.config.EFX_TOKEN_ACCOUNT
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
  vtransfer = async (fromAccount: string, toAccount: string, amount: string, permission: string): Promise<object> => {
    // TODO: BSC vtransfer
    const balanceFrom: object = await this.getBalance(fromAccount)
    const balanceIndexFrom: number = balanceFrom[0].id
    const balanceTo: object = await this.getBalance(toAccount)
    const balanceIndexTo: number = balanceTo[0].id
    try {
      const result = await this.api.transact({
        actions: [{
          account: this.config.ACCOUNT_CONTRACT,
          name: 'vtransfer',
          authorization: [{
            actor: fromAccount,
            permission: permission,
          }],
          data: {
            from_id: balanceIndexFrom,
            to_id: balanceIndexTo,
            quantity: {
              quantity: amount + ' ' + this.config.EFX_SYMBOL,
              contract: this.config.EFX_TOKEN_ACCOUNT
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
