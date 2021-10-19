/**
* Convert amount to asset
* @param amount
* @returns
* Inspiration from: https://github.com/EOSIO/eosjs/blob/3ef13f3743be9b358c02f47263995eae16201279/src/format.js
*/
export function convertToAsset(amount: string): string {
  // TODO: add filter for wrong values, e.g -1, or 10.00000
  try {
    // TODO: how to get config in utils?
    // this.config.efx_precision
    const precision = 4
    const part = amount.split('.')

    if (part.length === 1) {
      return `${part[0]}.${'0'.repeat(precision)}`
    } else {
      const pad = precision - part[1].length
      return `${part[0]}.${part[1]}${'0'.repeat(pad)}`
    }
  } catch (error) {
    throw Error(error)
  }
}