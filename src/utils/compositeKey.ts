import { Serialize, Numeric } from 'eosjs'
/**
 * Utility function: Create composite key with `account id` and `campaign id`
 * @param accountId ID of account logged in
 * @param campaignId ID of the campaign
 * @returns uint 64 bit number
*/
export function getCompositeKey(accountId: number, campaignId: number): number {
  const buf = new Serialize.SerialBuffer()
  buf.reserve(64)
  buf.pushUint32(accountId)
  buf.pushUint32(campaignId)
  return parseInt(Numeric.binaryToDecimal(buf.getUint8Array(8)))
}

// TODO: function not working, fix
export function splitCompositeKey(compositeKey: number): Array<Number> {
  // const buf = new Serialize.SerialBuffer({array: new Uint8Array(compositeKey)})
  const buf = new Serialize.SerialBuffer({array: Numeric.decimalToBinary(8, compositeKey.toString())})
  return [buf.getUint32(), buf.getUint32()]
}