const { exit } = require('process')
const { EffectClient, createAccount, createWallet } = require('../dist/lib')

const main = async () => {
    console.log('Starting...')
    const sdk = new EffectClient('kylin')

    // Instantiating bsc account.
    const account = createAccount(
        // leave empty to generate new private key
        '0x6f46d8d7c9684ed049c941758cb9186eb2b5758221a229e27861fe357edb770d'
    )
    // Generate web3 instance from account with private key.
    // Could also be the web3 object with a MetaMask connection etc.
    const web3 = createWallet(account)

    // Connect web3 account to SDK
    const effectAccount = await sdk.connectAccount(web3);

    console.log('effectAccount', effectAccount)

    const campaignToIpfs = {
        title: 'Random Title',
        description: 'Networked well-modulated instruction set',
        instructions: `American whole magazine truth stop whose. On traditional measure example sense peace. Would mouth relate own chair.
        Together range line beyond. First policy daughter need kind miss`,
        template:   `<div id="task">
                        <image src='` + '${image_url}' + `'></image>
                        <h2>Image Classification</h2>
                        <option submit name="button-answer" type="button" :options="['Cat','Dog','Mechanical Turk','Other']" label="What do you see in the picture above?"></option>
                    </div>`,
        image: 'https://ipfs.effect.ai/ipfs/bafkreiggnttdaxleeii6cdt23i4e24pfcvzyrndf5kzfbqgf3fxjryj5s4',
        category: 'Image Labeling',
        example_task: {'image_url': 'https://ipfs.effect.ai/ipfs/bafkreidrxwhqsxa22uyjamz7qq3lh7pv2eg3ykodju6n7cgprmjpal2oga'},
        version: 1,
        reward: 1
    }

    // Create campaign.
    // campaign object, reward
    const makeCampaign = await sdk.force.makeCampaign(campaignToIpfs, '11')
    console.log('makeCampaign', makeCampaign)

    // TEMP
    // TODO: get campaignId from response makeCampaign
    const campaignId = 88
    const campaign = await sdk.force.getCampaign(campaignId)
    console.log('Campaign', campaign)

    // Get Campaign Batches.
    const batches = await sdk.force.getCampaignBatches(campaignId)
    console.log(`Batches for campaign ${campaignId}`, batches)

    const content = {
        'tasks': [
            {"ipfs": "bafkreiggnttdaxleeii6cdt23i4e24pfcvzyrndf5kzfbqgf3fxjryj5s4"}, 
            {"ipfs": "bafkreidrxwhqsxa22uyjamz7qq3lh7pv2eg3ykodju6n7cgprmjpal2oga"}, 
            {"ipfs": "bafkreid2ocabg7mo235uuwactlcf7vzxyagoxeroyrubfufwobtqz3q27q"}, 
            {"ipfs": "bafkreifu5xciyxpwnmkorzddanqtc66i43q5cn4sdkb3l563yjzd7s3274"}
        ]
    }
   
    const repetitions = 1
    // Create batch for campaign.
    // same here as for campaign, id of batch needs to be returned
    const batch = await sdk.force.createBatch(campaign.id, batches.length, content, repetitions)
    console.log('createBatch', batch)

    // Get task submissions of batch.
    const taskResults = await sdk.force.getTaskSubmissionsForBatch(batches.length)
    console.log('taskResults for new batch', taskResults)
}

main()