# SDK feature list.

- [x] EFX to FIAT conversion function
- [x] Submit task action
- [x] ~~Get task data from IPFS~~
- [x] Get pending payouts (copy from old)
- [x] Payout action (copy from old)
- [x] Cashout action (copy from old)



## Current methods list

These methods are currently implemented in the Effect-JS SDK.
These methods need to be split up into Effect-JS, and Effect-Py.

Effect-JS, will first focus on methods and features that are needed for workers
and the browser. Effect-Py will focus on methods and features that are needed
for requestors.

### Utils

- [ ] isEosAccount
- [ ] convertToAsset
- [ ] getCompositeKey // Create composite key from accountid and campaignid

### Client

- [ ] connectAccount
- [ ]EFX to usdt on defibox

### Account

- [ ] deposit
- [ ] withdraw
- [ ] vtransfer
- [ ] getVaccountByName
- [ ] getVaccountById
- [ ] openAccount
- [ ] getPendingBalance

### Force

#### Qualification

Qualificatoins are used to qualify workers for a campaign.
How will these functions change now that we are using NFT's?

- [ ] ~~createQualification~~
- [ ] ~~updateQualification~~
- [ ] ~~deleteQualification~~
- [ ] ~~assignQualification~~
- [ ] ~~unassignQualification~~
- [ ] getAssignedQualifications // Get all qualifications assigned to a worker
- [ ] getQualification // Get a qualification by id
- [ ] getQualifications // Get all qualifications
- [ ] getUserQualification // Get a qualification created by user. (User is the owner of the qualification). Qualifications will be managed by Effect Network?

How would the interface for managing Qualifications look like?


- [ ] mintQualification
- [ ] 

### Campaign

#### implemented

- [ ] createCampaign
- [ ] delteCampaign
- [ ] updateCampaign
- [ ] getCampaign // Get a campaign by id
- [ ] getCampaigns // Get all campaigns
- [ ] getCampaignBatches // Not sure if this is still needed with the new campaign contract.
- [ ] ~~getMyLastCampaign~~ // Utility method to get the last campaign created by the user. Not needed for next iteration.
- [ ] ~~makeCampaign~~ // What does this do? How is it different than createCampaign?
- [ ] ~~processCampaign~~ // Retrieve campaign from IPFS and process it. Not needed for next iteration.
- [ ] ~~uploadCampaign~~ // Upload campaign to IPFS. Not needed for next iteration.

#### New functions

- [ ] pauseCampaign // Considering batches will be abstracted away, we should implement a pauseCampaign function
- [ ] resumeCampaign // Read notes above.

### Batch

- [ ] getBatchById
- [ ] getBatchId
- [ ] pauseBatch
- [ ] resumeBatch


## Notes

## Campaign

I forsee that updating the campaign will be an issue.
It's an issue we've had before where updating the campaign resulted in breaking the template and or how the submission data is processed and rendered when downloaded.

Since we are managing the campaign that are hosted on Effect ourselves, how will this influence how we update campaigns?

Solutions to deal with this could include:

- Making sure that the campaign can only be updated when there are no active tasks in the campaign. // This one is feasible, we would probably need to add the functionality to delete batches within the campaign?
- Making the campaign immutable. // This doesn't seem feasible
-
