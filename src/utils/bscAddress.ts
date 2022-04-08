/**
 * Utility function: Check if address is a BSC address
 * @param address
 * @returns 
 */
export function isBscAddress(address: string): boolean {
  return (address.length == 42 || address.length == 40)
}

/**
 * Utility function: Validate EOS account name
 * @param eosAccount 
 * @returns 
 */
export function validEosAccount (eosAccount: string): boolean {
  const validEosChars = 'abcdefghijklmnopqrstuvwxyz12345' // Allowed characters for EOS eosAccount name
  const maxEosLength = 12
  const validChars = eosAccount.split('').every((char) => validEosChars.split('').includes(char))
  const length = eosAccount.length <= maxEosLength
  console.debug('valideosaccount', validChars, length)
  return validChars && length
}
