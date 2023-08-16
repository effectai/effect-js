import { IpfsContentFormat, IpfsService } from '../src/services/ipfs'
import { Client } from '../src/client'
// import fetch from 'node-fetch'
const fetch = require('node-fetch')

const client = new Client('jungle4', { fetch })

const hash = 'QmXKn3tGx6CoyaMVgR9L6df3Dtbocx2zvMoQxSNNU1oEnV'

test('should upload ipfs info', async () => {
    const uploadHash = await client.ipfs.upload({ hello : 'world' })
    
    expect(uploadHash).toBeDefined()
    expect(uploadHash).not.toBeNull()
    expect(typeof uploadHash).toBe('string')
})

test('Should fetch ipfs info', async () => {
    const ipfsInfo = await client.ipfs.fetch(hash, IpfsContentFormat.JSON)
    console.log(ipfsInfo)
    expect(ipfsInfo).toBeDefined()
    expect(ipfsInfo).not.toBeNull()
})
