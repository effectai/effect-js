import { AnyAction, Asset, NameType } from '@wharfkit/antelope';
import { type Client } from '../client';
import { TasksSettings, VAccount } from '../types';
import { InitBatch } from '../types/campaign';

export class ActionService {

    constructor(private readonly client: Client) {}


/**
 *             const makeBatchAction = {
                account: this.client.config.tasksContract,
                name: 'mkbatch',
                authorization: [{
                    actor: this.client.session.actor,
                    permission: this.client.session.permission,
                }],
                data: {
                    id: settings.force_vaccount_id, // TODO determine ID
                    campaign_id: initBatch.campaign_id,
                    content: { field_0: 0, field_1: hash },
                    repetitions: initBatch.repetitions,
                    payer: this.client.session.actor,
                    sig: null,
                },
            }
 */
    makeBatchAction = (settings: TasksSettings, initBatch: InitBatch, hash: string): AnyAction => ({
        account: this.client.config.tasksContract,
        name: 'mkbatch',
        authorization: [{
            actor: this.client.session.actor  as unknown as NameType,
            permission: this.client.session.permission  as unknown as NameType,
        }],
        data: {
            id: settings.force_vaccount_id, // TODO determine ID
            campaign_id: initBatch.campaign_id,
            content: { field_0: 0, field_1: hash },
            repetitions: initBatch.repetitions,
            payer: this.client.session.actor,
            sig: null,
        },
})

/**
 *             const vTransferAction = {
                account: this.client.config.vaccountContract,
                name: 'vtransfer',
                authorization: [{
                    actor: this.client.session.actor,
                    permission: this.client.session.permission,
                }],
                data: {
                    from_id: vacc.id,
                    to_id: settings.force_vaccount_id,
                    quantity: {
                        quantity: batchPrice,
                        contract: this.client.config.tokenContract,
                    },
                    memo: '',
                    payer: this.client.session.actor,
                    sig: null,
                    fee: null,
                },
            }
 */
    vTransferAction = (settings: TasksSettings, vacc: VAccount, batchPrice: number): AnyAction => ({
        account: this.client.config.vaccountContract,
        name: 'vtransfer',
        authorization: [{
            actor: this.client.session.actor as unknown as NameType,
            permission: this.client.session.permission as unknown as NameType,
        }],
        data: {
            from_id: vacc.id,
            to_id: settings.force_vaccount_id,
            quantity: {
                quantity: batchPrice,
                contract: this.client.config.tokenContract,
            },
            memo: '',
            payer: this.client.session.actor,
            sig: null,
            fee: null,
        },
    })

/**
 * 
            const publishBatchAction = {
                account: this.client.config.tasksContract,
                name: 'publishbatch',
                authorization: [{
                    actor: this.client.session.actor,
                    permission: this.client.session.permission,
                }],
                data: {
                    batch_id: 0, // TODO
                    num_tasks: 0, // TODO
                    sig: null,
                },
            }
 */
    publishBatchAction = (batchId: number, numTasks: number): AnyAction => ({
        account: this.client.config.tasksContract,
        name: 'publishbatch',
        authorization: [{
            actor: this.client.session.actor as unknown as NameType,
            permission: this.client.session.permission as unknown as NameType,
        }],
        data: {
            batch_id: batchId,
            num_tasks: numTasks,
            sig: null,
        }
    })

    /**
     * {
                    "account": this.client.config.tokenContract,
                    "name": "transfer",
                    "authorization": [
                      {
                        "actor": this.client.session.actor,
                        "permission": this.client.session.permission
                      }
                    ],
                    "data": {
                      "from": this.client.session.actor,
                      "to": this.client.config.vaccountContract,
                      "quantity": Asset.from(amount, '4,EFX'),
                      "memo": `${vacc.id}`
                    }
                  }
     */
    depositAction = (amount: number, vacc: VAccount): AnyAction => ({
        account: this.client.config.tokenContract,
        name: 'transfer',
        authorization: [{
            actor: this.client.session.actor as unknown as NameType,
            permission: this.client.session.permission as unknown as NameType,
        }],
        data: {
            from: this.client.session.actor,
            to: this.client.config.vaccountContract,
            quantity: Asset.from(amount, '4,EFX'),
            memo: `${vacc.id}`,
        },
    })


}