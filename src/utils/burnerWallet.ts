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
