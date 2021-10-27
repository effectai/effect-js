import { Serialize } from 'eosjs'

/**
 * Utility function: Convert string to hex
 * @param str - string to convert
 * @returns string
 */
export function stringToHex(str: string): string {
  let result = '';
  for (var i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}
/**
 * Utility function: Convert account name to hex
 * @param account: string - account name
 * @returns string
 */
export function nameToHex(account: string): string {
  const serialbuff = new Serialize.SerialBuffer();
  serialbuff.pushName(account);
  const bytes = serialbuff.asUint8Array();
  return Serialize.arrayToHex(bytes);
}