import { Client } from './client'

test('Client', async () => {
    const client = new Client()

    expect(client).toBeDefined()
    expect(client.config).toBeDefined()
    expect(client.tasks).toBeDefined()
    expect(client.ipfs).toBeDefined()
    expect(client.vaccount).toBeDefined()
})
