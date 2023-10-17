import { Client } from './../src/client';
import { DaoConfig } from '../src/types/campaign';

import {expect, test, describe} from 'vitest'

const client = new Client('eos')

describe('DaoService', () => {

    test('Should return the config from the dao contract, on mainnet.', async () => {
        const whiteListedCollections = await client.dao.getConfig()
        expect(whiteListedCollections).toBeDefined()
        expect(whiteListedCollections).not.toBeNull()
        expect(whiteListedCollections).toBeTypeOf('object')

        expect(whiteListedCollections).toHaveProperty('stake_contract')
        expect(whiteListedCollections).toHaveProperty('proposal_contract')
        expect(whiteListedCollections).toHaveProperty('utl_token_sym')
        expect(whiteListedCollections).toHaveProperty('gov_token_sym')
        expect(whiteListedCollections).toHaveProperty('allowed_collections')
    })

})


/**
 * {
  stake_contract: 'efxstakepool',
  proposal_contract: 'daoproposals',
  utl_token_sym: { sym: '4,EFX', contract: 'effecttokens' },
  gov_token_sym: { sym: '4,NFX', contract: 'effecttokens' },
  allowed_collections: [ '.gems', 'avatar.boid', 'pomelo', 'shufan.free' ]
}
 */
