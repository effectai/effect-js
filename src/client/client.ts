import { Api, JsonRpc, RpcError } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch' // fetch for node.js environment 
import * as dotenv from "dotenv";
import process from "process";

dotenv.config();

/**
 * Options that can be passed to the client factory.
 */
export interface EffectClientOptions {

    /**
     * The network to connect to.
     */
    network: "mainnet" | "kylin" | string

    /**
     * Private key of the account to use for the client.
     */
    privateKey: string

    /**
     * The host where the json-rpc will connect to.
     * @default "localhost"
     */
    host: string

    /**
     * The Effect API Key to interact with Effect-Network api service.
     * TODO: Update this url
     * You can obtain and manage your keys at: https://api.effect.network
     */
    apiKey?: string

    /**
     * Protocol to use for the connection.
     */
    secure?: boolean

    /**
     * Specifies the need for authentication of the call. 
     * If the call is made to a public endpoint this can be set to false.
     */
    authentication?: boolean

    /**
     * Authentication url
     * @default https://auth.effect.network
     */
    authUrl?: string
}

export const getAnswer = (): string => {
    return process.env.ANSWER || "42"
}

export function getOtherAnswer (): string {
    return process.env.OTHER_ANSWER || "43"
}

export function printAnswer (): void {
    console.log(getAnswer())
}

export function createEffectClient(options: EffectClientOptions): Api {
    const { apiKey, network, privateKey, host, secure, authentication, authUrl } = options
    const signatureProvider = new JsSignatureProvider([privateKey])
    const rpc = new JsonRpc(host, {fetch})
    const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
    return api
}


// export class EffectClient {

//     constructor(options: EffectClientOptions) {
//         this.api = createClient(options)
//     }
// }