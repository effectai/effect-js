import { Client } from '../src/client'
import { Campaign, Reservation } from '../src/types/campaign'
import { describe, expect, expectTypeOf, test } from 'vitest'
import { config } from 'dotenv'

const cacc = config({
    path: './test/.env.test',
    debug: true
})

// console.log('cacc', cacc)

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
        expectTypeOf(campaign).toMatchTypeOf<Campaign>()
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

    test('User login', async () => {

        expect(() => client.requireSession()).toThrowError()

        client.login(process.env.VITE_EOSACC!, process.env.VITE_EOSPERM!, process.env.VITE_EOSPK!)

        expect(client.session).toBeDefined()
    })

    test('Reserve Task', async () => {
        const campaign = await client.tasks.getCampaign(0)
        client.login(process.env.VITE_EOSACC!, process.env.VITE_EOSPERM!, process.env.VITE_EOSPK!)

        console.debug('Trying to reserve task test')
        const reservation = await client.tasks.reserveTask(campaign.id)

        expect(reservation).toBeDefined()
        expectTypeOf(reservation).toMatchTypeOf<Reservation>()
        expect(reservation.id).toEqual(0)
        expect(reservation.campaign_id).toEqual(0)
        
    })

})
