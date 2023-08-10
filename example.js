const efxSdk = require('./dist/index')

const effect = new efxSdk.Client()


effect.tasks.getCampaigns().then(console.log).catch(console.error)
