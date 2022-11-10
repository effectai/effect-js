/**
 * Utility function: Convert amount to asset
 * @param amount
 * @returns string
 * Inspiration from: https://github.com/EOSIO/eosjs/blob/3ef13f3743be9b358c02f47263995eae16201279/src/format.js
*/
export function convertToAsset(amount: string | number): string {
  try {

    // this.config.efx_precision
    // console.log(amount);

    if (Number(amount) < 0) {
      throw new Error('Amount must be positive');
    }

    const precision = 4
    const part = amount.toString().split('.')
    // console.debug('partsss', part)

    // When would this happen? 
    if (part.length === 1) {
      const res = `${part[0]}.${'0'.repeat(precision)}`
      // console.debug(`convertToAsset: ${amount} -> ${res}`)
      return res
    } else {
      if (part[1].length > precision) {
        const ifres = `${part[0]}.${part[1].substring(0, precision)}`
        // console.debug(` - ifres: ${ifres}`)
        return ifres
      } else {
        const pad = precision - part[1].length
        // console.log(`pad = precision - part[1].length -> ${pad} = ${precision} - ${part[1].length}`)
        const elseres = `${part[0]}.${part[1].padEnd(precision, '0')}`
        // console.debug(`convertToAsset - elseres: ${elseres}`)
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
