import { Client } from '../src/client'
import { describe, expect, expectTypeOf, test, } from 'vitest'
import { VAccount } from '../src/types/user'
import { AtomicAsset } from '../src/types/campaign'


describe('VAccount on jungle', async () => {

    const client = new Client('jungle')

    test('Client', async () => {
        expect(client).toBeInstanceOf(Client)
    })

    test('Open VAccount', async () => {
        client.login(process.env.VITE_EOSACC!, process.env.VITE_EOSPERM!, process.env.VITE_EOSPK!)
        expect(client.session).toBeDefined()
    })

    test('Get VAccount', async () => {
        const response = await client.vaccount.getAll()
        const [ vaccount ] = response
        expect(vaccount).toBeDefined()
        const [ , name ] = vaccount.address
        expect(name).toEqual(process.env.VITE_EOSACC)
        expectTypeOf(vaccount).toMatchTypeOf<VAccount>()
    })
})

describe('VAccount on eos', async () => {
    const client = new Client('eos')
    
    test('Get VAccount AtomicAsset', async () => {
        const response = await client.vaccount.getAvatarAsset('cryptonode42')
        expect(response).toBeDefined()
        expect(response).not.toBeNull()
        expect(response).toBeTypeOf('object')
        expectTypeOf(response).toMatchTypeOf<AtomicAsset>()
    })
})
