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

    test('getCollection()', async () => {
        const collection = await client.atomic.getCollection('pomelo')
        expect(collection).toBeDefined()
        expect(collection).not.toBeNull()
        expect(collection).toBeInstanceOf(Object)
        expectTypeOf(collection).toMatchTypeOf<AtomicAsset>()
    })

    test('getSchema()', async () => {
        const asset = await client.vaccount.getAvatarAsset('cryptonode42')
        const schema = await client.atomic.getSchema(asset.collection_name, asset.schema_name)
        expect(schema).toBeDefined()
        expect(schema).not.toBeNull()
    })

})
