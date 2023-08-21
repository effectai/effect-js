import { Client } from '../src/client'
import { describe, expect, test } from 'vitest'

describe('Tasks', async () => {
    const client = new Client('jungle4')

    test('Client', async () => {
        expect(client).toBeInstanceOf(Client)
    })

    test('Get All Campaigns', async () => {
        const campaignList = await client.tasks.getCampaigns()

        expect(campaignList).toBeDefined()
        expect(campaignList).toBeInstanceOf(Array)
    
        const [ campaign ] = campaignList
        expect(campaign).toBeDefined()
        expect(campaign.id).toEqual(0)
    
        const [ , owner ] = campaign.owner
        expect(owner).toEqual('efxefxefxefx')
    })


    test('Get first Campaign', async () => {
        const campaign = await client.tasks.getCampaign(0)

        expect(campaign).toBeDefined()
        expect(campaign.id).toEqual(0)
    
        const [ , owner ] = campaign.owner
        expect(owner).toEqual('efxefxefxefx')
    })

    test('Reserve Task', async () => {
        const campaign = await client.tasks.getCampaign(0)
        // AccountId `vibrantcacti: 3`
        const reservation = await client.tasks.reserveTask(0, 3)

        console.log('reservation', reservation)

        expect(reservation).toBeDefined()
        expect(reservation.id).toEqual(0)
        expect(reservation.campaign_id).toEqual(0)
        expect(reservation.owner).toEqual('efxefxefxefx')
    })

})
