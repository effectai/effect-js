import Web3 from "web3";
import { EffectAccount } from "../types/effectAccount";

export class BurnerWallet {
    private web3: Web3
    private account: EffectAccount

    constructor (privateKey?: string) {
        this.reset()
        this.create(privateKey)
    }

    /**
     * Creates empty Web3 Object
     * @returns this
     */
    public reset(): BurnerWallet {
        this.web3 = new Web3('https://bsc-dataseed.binance.org')
        return this
    }

    /**
     * generate account (from privateKey if present).
     * @param privateKey string
     * @link https://web3js.readthedocs.io/en/v1.3.6/web3-eth-accounts.html#privatekeytoaccount
     * @link https://web3js.readthedocs.io/en/v1.3.6/web3-eth-accounts.html#create
     * @returns this
     */
    public create(privateKey?: string): BurnerWallet {
        if (privateKey) {
            this.account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
        } else {
            this.account = this.web3.eth.accounts.create()
        }
        this.account.provider = 'burner-wallet'
        return this
    }

    /**
     * creates empty wallet, then adds account to the wallet
     * @link https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#wallet-create
     * @link https://web3js.readthedocs.io/en/v1.5.2/web3-eth-accounts.html#wallet-add
     * @returns this
     */
    public addAccount(): BurnerWallet {
        // cannot leave input parameter empty, hence the 0 to create an empty wallet.
        this.web3.eth.accounts.wallet.create(0)
        this.web3.eth.accounts.wallet.add(this.account.privateKey)
        return this
    }

    /**
     * retrieves account object
     * @returns incomplete EffectAccount object, be sure to call sdk.connectAccount() to make it complete.
     */
    public getAccount(): EffectAccount {
        return this.account
    }
    
    /**
     * retrieves web3 object
     * @returns Web3 object
     */
    public getWeb3(): Web3 {
        return this.web3
    }
}
