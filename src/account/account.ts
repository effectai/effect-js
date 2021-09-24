import { Api, Serialize } from 'eosjs'
import Web3 from 'web3';

export class Account {
  api: Api;
  config: any;
  web3: Web3;

  constructor(api: Api, web3?: Web3) {
    this.api = api;
    this.web3 = web3;

    // TODO: replace this with proper config
    this.config = {
      EFX_TOKEN_ACCOUNT:"tokenonkylin",
      EFX_SYMBOL:"UTL",
      EFX_EXTENDED_SYMBOL:"4,UTL",
      EOS_RELAYER:"testjairtest",
      ACCOUNT_CONTRACT:"acckylin1111"
    }
  }

  /**
   * Get the balance from a vaccount
   * @param account - name of the account or bsc
   * @returns - balance object of
   */
  getBalance = async (account: string): Promise<Array<object>> => {
    try {
      let accString;

      if(this.isBscAddress(account)) {
        const address:string = account.length == 42 ? account.substring(2) : account;
        accString = (this.nameToHex(this.config.EFX_TOKEN_ACCOUNT) + "00" + address).padEnd(64, "0");
      } else {
        accString = (this.nameToHex(this.config.EFX_TOKEN_ACCOUNT) + "01" + this.nameToHex(account)).padEnd(64, "0");
      }

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
        console.log('data', data);
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
      let type = 'name'
      let address: string
      if(this.isBscAddress(account)) {
        type = 'address'
        address = account.length == 42 ? account.substring(2) : account;
      }

      const result = await this.api.transact({
        actions: [{
          account: this.config.ACCOUNT_CONTRACT,
          name: 'open',
          authorization: [{
            actor: type == 'address' ? this.config.EOS_RELAYER : account,
            permission: permission ? permission : 'active',
          }],
          data: {
            acc: [type, type == 'address' ? address : account],
            symbol: {contract: this.config.EFX_TOKEN_ACCOUNT, sym: this.config.EFX_EXTENDED_SYMBOL},
            payer: type == 'address' ? this.config.EOS_RELAYER : account,
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
    const balance: Array<any> = await this.getBalance(toAccount)
    let balanceIndexFrom: number;
    let nonce: number;
    if (balance) {
      balance.forEach((row) => {
        if (row.balance.contract === this.config.EFX_SYMBOL) {
          balanceIndexFrom = row.id;
          nonce = row.nonce;
        }
      });
    }

    // (defn pack-withdraw-params
    //   [nonce from to {:keys [quantity contract]}]
    //   (let [buff (doto (new (.-SerialBuffer Serialize))
    //                (.push 2)
    //                (.pushUint32 nonce)
    //                (.pushArray (uint64->bytes from))
    //                (.pushName to)
    //                (.pushAsset quantity)
    //                (.pushName contract))]
    //     (.asUint8Array buff)))
    // withdraw_params params = {2, from.nonce, from.id, to_account, quantity};
    // std::vector<char> msg_bytes = pack(params);
    // require_sig(msg_bytes, from, sig.value());
    if(this.isBscAddress(fromAccount)) {
      const serialbuff = new Serialize.SerialBuffer();

      serialbuff.push(2)
      serialbuff.pushUint32(nonce)
      // todo: first to bytes
      //serialbuff.pushArray(balanceIndexFrom)
      serialbuff.pushName(toAccount)
      serialbuff.pushAsset(amount)
      serialbuff.pushName(this.config.ACCOUNT_CONTRACT)
      
    }

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
            // TODO: add sig for bsc
            sig: this.isBscAddress(fromAccount) ? null : null,
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

  /**
   * Check if account is bsc address
   * @param account 
   */
  isBscAddress = (account: string): boolean => {
    return (account.length == 42 || account.length == 40)
  }
}
