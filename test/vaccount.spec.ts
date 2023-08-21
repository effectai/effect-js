import { Client } from '../src/client'
import { describe, expect, test, } from 'vitest'
import { config } from 'dotenv'

config({
    path: './test/.env',
    debug: true
})

console.log('process.env.VITE_EOSACC', process.env.VITE_EOSACC)

describe('VAccount', async () => {

    const client = new Client('jungle4')

    test('Client', async () => {
        expect(client).toBeInstanceOf(Client)
    })

    test('Open VAccount', async () => {
        await client.login(process.env.VITE_EOSACC!, process.env.VITE_EOSPERM!, process.env.VITE_EOSPK!)
        expect(client.session).toBeDefined()
    })

})
