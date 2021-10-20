/**
 * Check if address is a BSC address
 * @param address
 * @returns 
 */
export function isBscAddress(address: string): boolean {
  return (address.length == 42 || address.length == 40)
}