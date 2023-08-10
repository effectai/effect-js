const efxSdk = require('./dist/index')

const client = new efxSdk.Client()

client.getCampaigns().then(console.log).catch(console.error)
