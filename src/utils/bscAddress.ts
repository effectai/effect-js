import { Serialize } from "eosjs"
import { Signature } from 'eosjs/dist/eosjs-key-conversions';
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
import Account from 'eth-lib/lib/account';
import { utils } from 'ethers';
import BN from 'bn.js';
import Web3 from "web3";


/**
 * Utility function: Check if address is a BSC address
 * @param address
 * @returns 
 */
export function isBscAddress(address: string): boolean {
  return (address.length == 42 || address.length == 40)
}
/**
   * Generate Signature
   * @param serialbuff
   * @param options
   * @returns
   */
 export async function generateSignature(web3: Web3, serialbuff: Serialize.SerialBuffer, options: object): Promise<Signature> {
  let sig = undefined
  const bytes = serialbuff.asUint8Array()

  let paramsHash = ec.hash().update(bytes).digest()
  paramsHash = Serialize.arrayToHex(paramsHash)

  try {
    if(options['provider'] === 'burner-wallet') {
      // TODO: figure out how to do this more clean later on.
      sig = Account.sign('0x' + paramsHash, web3.eth.accounts.wallet[0].privateKey);
    } else {
      sig = await web3.eth.sign('0x'+paramsHash, options['address'])
    }
  } catch (error) {
    return Promise.reject(error)
  }

  sig = utils.splitSignature(sig)
  // TODO: figure out how to get Signature in right format without this hack
  sig.r = new BN(sig.r.substring(2),16)
  sig.s = new BN(sig.s.substring(2), 16)
  sig = Signature.fromElliptic(sig, 0)

  return sig
}
