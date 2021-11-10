import Web3 from "web3";
import { Account } from 'web3-core/types/index'

/**
 * @param web3 Web3 object
 * @link https://web3js.readthedocs.io/en/v1.3.6/web3-eth-accounts.html#create
 * @returns Account object with private key and address.
 */
export function createBurnerWallet(web3: Web3): Account {
    return web3.eth.accounts.create()
}
/**
 * @param web3 Web3 object
 * @param privateKey String
 * @link https://web3js.readthedocs.io/en/v1.3.6/web3-eth-accounts.html#privatekeytoaccount
 * @returns Account object generated from private key.
 */
export function privateKeyToBurnerWallet(web3: Web3, privateKey: string): Account {
    return web3.eth.accounts.privateKeyToAccount(privateKey)
}

/**
 * 
 * @param web3 Web3 object
 * @param account Account
 * @link https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#wallet-add
 * @link https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#wallet-create
 * @returns newly added account from wallet.
 */
export function addToBurnerWallet(web3: Web3, account: Account): Account {
    // cannot leave input parameter empty, hence the 0 to create an empty wallet.
    web3.eth.accounts.wallet.create(0)
    web3.eth.accounts.wallet.add(account)
    return web3.eth.accounts.wallet[account.address]
}

/**
 * 
 * @param web3 Web3 object
 * @param index number
 * @link https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#wallet
 * @returns Account object based of index in the wallet.
 */
export function getAccountfromWallet(web3: Web3, index: number): Account {
    return web3.eth.accounts.wallet[index]
}