import { Client } from '../src/client'
const fetch = require('node-fetch')

test('Client', async () => {
    const client = new Client('jungle4', { fetch })
    expect(client).toBeInstanceOf(Client)

    const result = await client.tasks.getCampaigns()
    console.log(result)
    expect(result).toBeDefined()
    
})



