import { Client } from './../src/client';
import { DaoConfig } from '../src/types/campaign';

import {expect, test, describe, expectTypeOf} from 'vitest'

const client = new Client('eos')

describe('DaoService', () => {

    test('Should return the config from the dao contract, on mainnet.', async () => {
        const whiteListedCollections = await client.dao.getConfig()
        expect(whiteListedCollections).toBeDefined()
        expect(whiteListedCollections).not.toBeNull()
        expect(whiteListedCollections).toBeTypeOf('object')
        expectTypeOf(whiteListedCollections).toMatchTypeOf<DaoConfig>()
    })

    test('Should set the avatar asset for the user.', async () => {
        // TODO
    })

})
