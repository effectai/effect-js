import { Client } from './../src/client';
import {expect, test, describe} from 'vitest'

const client = new Client('eos')

describe('EfxService', () => {

    test('Should return the whitelisted assets from the DAO contract', async () => {
        const whiteListedCollections = await client.atomic.getAtomicAssets()
        expect(whiteListedCollections).toBeDefined()
        expect(whiteListedCollections).not.toBeNull()
    })

})
