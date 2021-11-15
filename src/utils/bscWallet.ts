import Web3 from "web3";
import { EffectAccount } from "../types/effectAccount";
const web3 = new Web3();

/**
 * generate account (from privateKey if present).
 * @param privateKey string
 * @link https://web3js.readthedocs.io/en/v1.3.6/web3-eth-accounts.html#privatekeytoaccount
 * @link https://web3js.readthedocs.io/en/v1.3.6/web3-eth-accounts.html#create
 * @returns EffectAccount
 */
export function createAccount(privateKey?: string): EffectAccount {
    let account;
    if (privateKey) {
        account = web3.eth.accounts.privateKeyToAccount(privateKey)
    } else {
        account = web3.eth.accounts.create()
    }
    account.provider = 'burner-wallet'
    return account
}

/**
 * creates empty wallet, then adds account to the wallet
 * @link https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#wallet-create
 * @link https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#wallet-add
 * @returns Web3
 */
export function createWallet(account: EffectAccount): Web3 {
    const web3WithAccount = new Web3();
    web3WithAccount.eth.accounts.wallet.create(0)
    web3WithAccount.eth.accounts.wallet.add(account.privateKey)
    return web3WithAccount
}
