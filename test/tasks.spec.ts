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

    test('Get Batch from Campaign', async () => {
        const batch = await client.tasks.getBatch(0)
        expect(batch).toBeDefined()
        expect(batch.id).toEqual(0)
    })

    test('User login', async () => {

        // Test that the client throws an error if we try to reserve a task without logging in.
        expect(() => client.requireSession()).toThrowError()

        // Login, make sure these are set in your .env.test file.
        client.login(process.env.VITE_EOSACC!, process.env.VITE_EOSPERM!, process.env.VITE_EOSPK!)
        expect(client.session).toBeDefined()
        expect(() => client.requireSession()).not.toThrowError()
    })

    test('Reserve Task', async () => {
        const campaign = await client.tasks.getCampaign(0)
        client.login(process.env.VITE_EOSACC!, process.env.VITE_EOSPERM!, process.env.VITE_EOSPK!)

        const reservation = await client.tasks.reserveTask(campaign.id)

        expect(reservation).toBeDefined()
        expectTypeOf(reservation).toMatchTypeOf<Reservation>()
        expect(reservation.id).toEqual(0)
        expect(reservation.campaign_id).toEqual(0)
        
    })

    test('Get Task from Campaign', async () => {
        const campaign = await client.tasks.getCampaign(0)
        const reservation = await client.tasks.reserveTask(campaign.id)
        const taskData = await client.tasks.getTaskData(reservation)
        expect(taskData).toBeDefined()
    })



})
