import { Client } from '../src/client'
import { Campaign, Reservation, TasksSettings } from '../src/types/campaign'
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

    })

    test('Get first Campaign', async () => {
        const campaign = await client.tasks.getCampaign(0)

        expect(campaign).toBeDefined()
        expect(campaign.id).toEqual(0)
        expectTypeOf(campaign).toMatchTypeOf<Campaign>()
    })

    test('Get Batch from Campaign', async () => {
        const campaign = await client.tasks.getCampaign(3)
        const batch = await client.tasks.getBatch(campaign.num_batches.valueOf())
        console.debug('batch', batch)
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

    // TODO: Disabled until fetch is fixed
    test('Get Task from Campaign', async () => {
        const campaign = await client.tasks.getCampaign(0)
        const reservation = await client.tasks.reserveTask(campaign.id)
        const taskData = await client.tasks.getTaskData(reservation)
        expect(taskData).toBeDefined()
    })

    test('Get reps done', async () => {
        const repsDone = await client.tasks.getAllRepsDone()
        console.log('repsDoneeeeeeeeeeeeeeeeeeee', repsDone)
        expect(repsDone).toBeDefined()
        expect(repsDone.length).toBeDefined()
        expect(repsDone.length).toBeGreaterThan(0)
    })

    test('Get acctaskidx', async () => {
        const acctaskidx = await client.tasks.getAllAccTaskIdx()
        expect(acctaskidx).toBeDefined()
        expect(acctaskidx).toBeTypeOf('number')
    })


    test('Check settings for task contract', async () => {

        // These are the current settings for the task contract on jungle
        const settings: TasksSettings = {
                vaccount_contract: 'efxaccount11',
                force_vaccount_id: 11,
                payout_delay_sec: 1800,
                release_task_delay_sec: 1800,
                fee_contract: 'efxfeepool11',
                fee_percentage: '0.10000000149011612'
        }

        const contractConfig = await client.tasks.getForceSettings()

        expect(contractConfig).toBeDefined()
        expect(contractConfig).toBeInstanceOf(Object)

        expect(contractConfig.vaccount_contract).toEqual(settings.vaccount_contract)
        expect(contractConfig.force_vaccount_id).toEqual(settings.force_vaccount_id)
        expect(contractConfig.payout_delay_sec).toEqual(settings.payout_delay_sec)
        expect(contractConfig.release_task_delay_sec).toEqual(settings.release_task_delay_sec)
        expect(contractConfig.fee_contract).toEqual(settings.fee_contract)
        expect(contractConfig.fee_percentage).toEqual(settings.fee_percentage)
        expect(contractConfig.ram_payer).toEqual(settings.ram_payer)

    })



})
