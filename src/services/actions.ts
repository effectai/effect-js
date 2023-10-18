import { AnyAction, Asset, NameType } from '@wharfkit/antelope';
import { type Client } from '../client';
import { TasksSettings, VAccount } from '../types';
import { InitBatch } from '../types/campaign';

export class ActionService {

    constructor(private readonly client: Client) {}

    makeBatchAction = async (initBatch: InitBatch, hash: string): Promise<AnyAction> => {
        const { force_vaccount_id } = await this.client.tasks.getForceSettings()
        return {
            account: this.client.config.tasksContract,
            name: 'mkbatch',
            authorization: [{
                actor: this.client.session.actor as unknown as NameType,
                permission: this.client.session.permission as unknown as NameType,
            }],
            data: {
                id: force_vaccount_id,
                campaign_id: initBatch.campaign_id,
                content: { field_0: 0, field_1: hash },
                repetitions: initBatch.repetitions,
                payer: this.client.session.actor,
                sig: null,
            },
    }
    }

    vTransferAction = async (vacc: VAccount, batchPrice: number): Promise<AnyAction> => {
        const settings = await this.client.tasks.getForceSettings()
        return {
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
        }
    }

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
