import { AtomicAsset } from '../src/types/campaign';
import { Client } from './../src/client';
import {expect, test, describe, expectTypeOf} from 'vitest'

const client = new Client('eos')

describe('AtomicService', () => {

    test('getAccountAssets()', async () => {
        const accountAssets = await client.atomic.getAccountAssets('cryptonode42')
        expect(accountAssets).toBeDefined()
        expect(accountAssets).not.toBeNull()
        expect(accountAssets).toBeInstanceOf(Array)
        expect(accountAssets.length).toBeGreaterThan(0)
        expectTypeOf(accountAssets).toMatchTypeOf<AtomicAsset[]>()
    })

    test('getAsset()', async () => {
        const asset = await client.atomic.getAsset('cryptonode42', '2199025242551')
        expect(asset).toBeDefined()
        expect(asset).not.toBeNull()
        expect(asset).toBeInstanceOf(Object)
        expectTypeOf(asset).toMatchTypeOf<AtomicAsset>()
    })

})
