import { Client } from '../src/client'
import fetch from 'node-fetch'

test('Client', async () => {

    // Instantiate the client, Test jungle first.
    const client = new Client('jungle', { fetch })

    expect(client).toBeDefined()

    // Make sure all the services are available.
    expect(client).toHaveProperty('config')
    expect(client).toHaveProperty('tasks')
    expect(client).toHaveProperty('ipfs')
    expect(client).toHaveProperty('vaccount')
    
    // Check that the config is defined correctly
    expect(client.config).toHaveProperty('network')
    expect(client.config).toHaveProperty('eosExplorerUrl')
    expect(client.config).toHaveProperty('eosRpcUrl')
    expect(client.config).toHaveProperty('eosChainId')
    expect(client.config).toHaveProperty('ipfsEndpoint')
    expect(client.config).toHaveProperty('tasksContract')
    expect(client.config).toHaveProperty('tokenContract')
    expect(client.config).toHaveProperty('stakeContract')
    expect(client.config).toHaveProperty('feepoolContract')
    expect(client.config).toHaveProperty('proposalsContract')
    expect(client.config).toHaveProperty('vaccountContract')
    expect(client.config).toHaveProperty('daoContract')
    expect(client.config).toHaveProperty('efxSymbol')
    expect(client.config).toHaveProperty('efxPrecision')
    expect(client.config).toHaveProperty('eosRelayerAccount')
    expect(client.config).toHaveProperty('eosRelayerPermission')
    expect(client.config).toHaveProperty('eosRelayerUrl')
    expect(client.config).toHaveProperty('forceVaccountId')
    expect(client.config).toHaveProperty('ipfsCache')

})
