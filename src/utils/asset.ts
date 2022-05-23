/**
 * Utility function: Convert amount to asset
 * @param amount
 * @returns string
 * Inspiration from: https://github.com/EOSIO/eosjs/blob/3ef13f3743be9b358c02f47263995eae16201279/src/format.js
*/
export function convertToAsset(amount: string): string {
  // TODO: add filter for wrong values, e.g -1, or 10.00000
  try {
    // TODO: how to get config in utils?
    // this.config.efx_precision
    const precision = 4
    const part = amount.toString().split('.')
    if (part.length === 1) {
      const res = `${part[0]}.${'0'.repeat(precision)}`
      return res
    } else {
      if (part[1].length > precision) {
        const ifres = `${part[0]}.${part[1].substring(0, precision)}`
        return ifres
      } else {
        const pad = precision - part[1].length
        const elseres = `${part[0]}.${part[1].padEnd(pad, '0')}`
        return elseres
      }
    }
  } catch (error) {
    throw Error(error)
  }
}

/**
 * Utility function: Convert amount to asset
 * @param asset the EOS asset string such as "100.0000 EFX"
 * @returns tuple with the float amount and symbol string
 */
export function parseAsset(asset: string) : [number, string] {
  let [amount, symbol] = asset.split(' ')
  return [parseFloat(amount), symbol]
}
