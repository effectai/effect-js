import { Client } from '../src/client'
import { describe, expect, expectTypeOf, test, } from 'vitest'
import { config } from 'dotenv'
import { VAccount } from '../src/types/user'

config({
    path: './test/.env.test',
    debug: true
})

console.log('process.env.VITE_EOSACC', process.env.VITE_EOSACC)

describe('VAccount', async () => {

    const client = new Client('jungle4')

    test('Client', async () => {
        expect(client).toBeInstanceOf(Client)
    })

    test('Open VAccount', async () => {
        client.login(process.env.VITE_EOSACC!, process.env.VITE_EOSPERM!, process.env.VITE_EOSPK!)
        expect(client.session).toBeDefined()
    })

    test('Get VAccount', async () => {
        const response = await client.vaccount.getAll()
        const [ vaccount ] = response.rows
        expect(vaccount).toBeDefined()
        const [ , name ] = vaccount.address
        expect(name).toEqual(process.env.VITE_EOSACC)
        expectTypeOf(vaccount).toMatchTypeOf<VAccount>()
    })
})
