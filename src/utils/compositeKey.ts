import { Serialize, Numeric } from 'eosjs'
/**
 * Create composite key with `account id` and `campaign id`
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