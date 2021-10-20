import { Serialize } from 'eosjs'

/**
 * Convert string to hex
 * @param str 
 * @returns 
 */
export function stringToHex(str: string): string {
  let result = '';
  for (var i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
/**
 * Convert account name to hex
 * @param str 
 * @returns 
 */
export function nameToHex(account: string): string {
  const serialbuff = new Serialize.SerialBuffer();
  serialbuff.pushName(account);
  const bytes = serialbuff.asUint8Array();
  return Serialize.arrayToHex(bytes);
}