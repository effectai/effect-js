import { Client } from './../src/client';

import { expect, test, describe } from 'vitest'

const client = new Client('eos')

describe('EfxService', () => {

    test('should return the price of EFX', async () => {
        const efxPrice = await client.efx.getEfxPrice()
        expect(efxPrice).toBeDefined()
        expect(efxPrice).not.toBeNull()
        expect(typeof efxPrice).toBe('number')
        expect(efxPrice).toBeGreaterThan(0)

    })

})
