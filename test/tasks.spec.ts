import { Client } from '../src/client'

import { expect, test } from 'vitest'

test('Client', async () => {
    const client = new Client('jungle4')
    expect(client).toBeInstanceOf(Client)

    const result = await client.tasks.getCampaigns()
    console.log(result)
    expect(result).toBeDefined()
    
})



