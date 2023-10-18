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

    test('Should get the avatar asset for the user.', async () => {
        const avatarAsset = await client.dao.getAvatarAsset('cryptonode42')
        expect(avatarAsset).toBeDefined()
        expect(avatarAsset).not.toBeNull()
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
