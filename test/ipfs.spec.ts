import { IpfsContentFormat } from '../src/services/ipfs'
import { Client } from '../src/client'
import { expect, test } from 'vitest'

const client = new Client('jungle4')

const hash = 'QmXKn3tGx6CoyaMVgR9L6df3Dtbocx2zvMoQxSNNU1oEnV'

test('Should check that client is defined', async () => {
    expect(client).toBeDefined()
    expect(client).not.toBeNull()
    expect(client).toBeInstanceOf(Client)
})

test('should upload ipfs info download ipfs info', async () => {
    const helloWorldHash = 'QmNrEidQrAbxx3FzxNt9E6qjEDZrtvzxUVh47BXm55Zuen'
    const helloWorldObject = { hello : 'world' }
    const uploadWebHash = await client.ipfs.upload(helloWorldObject)
    expect(uploadWebHash).toBeDefined()
    expect(uploadWebHash).not.toBeNull()
    expect(typeof uploadWebHash).toBe('string')
    expect(uploadWebHash).toBe(helloWorldHash)

    const ipfsContent = await client.ipfs.fetch(helloWorldHash)
    expect(ipfsContent).toBeDefined()
    expect(ipfsContent).not.toBeNull()
    expect(typeof ipfsContent).toBe('object')
    expect(ipfsContent).toEqual(helloWorldObject)
})

test('Should fetch ipfs info correctly', async () => {

    const hash = 'QmXKn3tGx6CoyaMVgR9L6df3Dtbocx2zvMoQxSNNU1oEnV'
    const imageurl = 'https://ipfs.effect.ai/ipfs/QmVuSBpoSEUdHmB2owcbAQnModzfcbEme6w6nCkJDDJcy4'
    const ipfsInfo = await client.ipfs.fetch(hash)

    expect(ipfsInfo).toBeDefined()
    expect(ipfsInfo).not.toBeNull()
    expect(typeof ipfsInfo).toBe('object')
    expect(ipfsInfo?.data?.image).toBe(imageurl)
})
