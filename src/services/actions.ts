import { AnyAction, Asset } from "@wharfkit/session";
import { type Client } from "../client";
import { VAccount } from "../types";
import { InitBatch } from "../types/campaign";

export class ActionService {
    constructor(private readonly client: Client) {}

    makeBatchAction = async (
        initBatch: InitBatch,
        hash: string,
    ): Promise<AnyAction> => {
        const { force_vaccount_id } =
            await this.client.tasks.getForceSettings();
        const { actor, permission } = this.client.useSession();

        return {
            account: this.client.config.tasksContract,
            name: "mkbatch",
            authorization: [
                {
                    actor,
                    permission,
                },
            ],
            data: {
                id: force_vaccount_id,
                campaign_id: initBatch.campaign_id,
                content: { field_0: 0, field_1: hash },
                repetitions: initBatch.repetitions,
                payer: actor,
                sig: null,
            },
        };
    };

    vTransferAction = async (
        vacc: VAccount,
        batchPrice: number,
    ): Promise<AnyAction> => {
        const settings = await this.client.tasks.getForceSettings();
        const { actor, authorization } = this.client.useSession();

        return {
            account: this.client.config.vaccountContract,
            name: "vtransfer",
            authorization,
            data: {
                from_id: vacc.id,
                to_id: settings.force_vaccount_id,
                quantity: {
                    quantity: batchPrice,
                    contract: this.client.config.tokenContract,
                },
                memo: "",
                payer: actor,
                sig: null,
                fee: null,
            },
        };
    };

    publishBatchAction = (batchId: number, numTasks: number): AnyAction => {
        const { authorization } = this.client.useSession();

        return {
            account: this.client.config.tasksContract,
            name: "publishbatch",
            authorization,
            data: {
                batch_id: batchId,
                num_tasks: numTasks,
                sig: null,
            },
        };
    };

    depositAction = (amount: number, vacc: VAccount): AnyAction => {
        const { actor, authorization } = this.client.useSession();

        return {
            account: this.client.config.tokenContract,
            name: "transfer",
            authorization,
            data: {
                from: actor,
                to: this.client.config.vaccountContract,
                quantity: Asset.from(amount, "4,EFX"),
                memo: `${vacc.id}`,
            },
        };
    };
}
