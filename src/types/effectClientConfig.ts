import {
  JsSignatureProvider
} from "eosjs/dist/eosjs-jssig";
import {
  SignatureProvider
} from "eosjs/dist/eosjs-api-interfaces";
import Web3 from "web3";

/**
 * TODO Add examples and defaults to all of the comment documentation
 * Options that can be passed to the client factory.
 */
export interface EffectClientConfig {

  /**
   * The network to connect to.
   * @default mainnet or kylin
   */
  network ? : string

  /**
   * EOS Signature Provider
   */
  signatureProvider ? : JsSignatureProvider | SignatureProvider

  /**
   * Web3 instance for BSC
   */
  web3 ? : Web3

  /**
   * Network Integer ID for BSC 
   * Mainnet: 56, Testnet: 97
   */
  bscNetworkId ? : number

  /**
   * Network Hex ID for BSC
   * Mainnet: 0x38, Testnet: 0x61
   */
  bscHexId ? : string

  /**
   * BSC Chain Name
   * Binance Smart Chain Network or Binance Smart Chain Testnet
   */
  bscChainName ? : string

  /**
   * BSC Network Type
   * @default Mainnet or Testnet
   */
  bscNetworkType ? : string

  /**
   * BSC Token Name
   * @default "Binance Coin"
   */
  bscTokenName ? : string

  /**
   * BSC Token Symbol
   * @default BNB
   */
  bscTokenSymbol ? : string

  /**
   * BSC Rpc Url
   * @default https://bsc-dataseed.binance.org/
   */
  bscRpcUrl ? : string

  /**
   * BSC Explorer Url
   * @default https://bscscan.com 
   * https://testnet.bscscan.com/
   */
  bscExplorerUrl ? : string

  /**
   * Bsc EFX Token Contract
   * @default '0xC51Ef828319b131B595b7ec4B28210eCf4d05aD0'
   */
  bscEfxTokenContract ? : string

  /**
   * EOS Explorer Url
   * @default https://bloks.io
   */
  eosExplorerUrl ? : string

  /**
   * EOS Node Url
   * Specify the protocol prefix and port postfix
   * @default https://greymass.com:443
   * http://localhost:8888
   */
  eosNodeUrl ? : string

  /**
   * Eos Node Protocol
   * @default https
   */
  eosNodeProtocol ? : string

  /**
   * Eos Host Name
   * @default greymass.com
   */
  eosHostName ? : string

  /**
   * Eos Port
   * @default 443
   */
  eosPort ? : number

  /**
   * IPFS
   * @default https://ipfs.effect.ai
   */
  ipfsNode ? : string

  /**
   * Force Contract
   * @default '', forceonkyli2
   */
  forceContract ? : string

  /**
   * Account Contract
   * @default "acckylin1111"
   */
  accountContract ? : string

  /**
   * EFX Token account
   * @default "tokenonkylin"
   */
  efxTokenAccount ? : string

  /**
   * EFX Token Symbol
   * 'EFX', 'UTL'
   */
  efxSymbol ? : string

  /**
   * EFX Token Precision
   * 4
   */
  efxPrecision ? : number

  /**
   * Extended Symbol
   * @default '4, EFX', '4,UTL'
   */
  efxExtendedSymbol ? : string

  /**
   * Eos Relayer
   */
  eosRelayerAccount ? : string

  /**
   * Relayer Permission
   * @default "active"
   */
  eosRelayerPermission ? : string

  /**
   * Relayer url
   * @default ""
   */
  eosRelayerUrl ? : string

  /**
   * The Vaccount ID of the Force EOS account
   */
  forceVaccountId ? : number

  /**
   * The period before a payment can be paid out, measured in seconds.
   */
  payoutDelaySec ? : number

  /**
   * The period before a reserved task can be automatically released, measured in seconds.
   */
  releaseTaskDelaySec ? : number
}