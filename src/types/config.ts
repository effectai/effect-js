export interface ClientConfig {
    /**
   * The network to connect to.
   * @default mainnet
   */
    network: string

    /**
   * EOS Explorer Url
   * @default https://bloks.io
   */
    eosExplorerUrl: string

    /**
   * EOS RPC node URL
   * Specify the protocol prefix and port postfix
   */
    eosRpcUrl: string

    /**
   * ID of the EOS chain
   */
    eosChainId: string

    /**
   * IPFS endopint
   * @default https://ipfs.effect.ai
   */
    ipfsEndpoint: string

    /**
   * Force Contract
   * @default tasks.efx
   */
    tasksContract: string

    /**
   * Account Contract
   * @default vaccount.efx
   */
    vaccountContract: string

    /**
   * EFX Token account
   * @default effecttokens
   */
    tokenContract: string

    /**
   * Effect DAO Contract
   */
    daoContract: string

    /**
   * Atomic Assets Contract
   */
    atomicAssetsContract: string

    stakeContract: string
    feepoolContract: string
    proposalsContract: string

    /**
   * EFX Token Symbol
   * @default EFX
   */
    efxSymbol: string

    /**
   * EFX Token Precision
   * @default 4
   */
    efxPrecision: number

    /**
   * Eos Relayer
   */
    eosRelayerAccount: string

    /**
   * Relayer Permission
   * @default "active"
   */
    eosRelayerPermission: string

    /**
   * Relayer url
   * @default ""
   */
    eosRelayerUrl: string

    /**
   * The Vaccount ID of the Force EOS account
   */
    forceVaccountId: number

    /**
   * Cache ipfs requests, enable or disable the ability to cache ipfs requests.
   * @default true
   */
    ipfsCache: boolean
}
