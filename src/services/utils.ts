import { Checksum256Type, UInt32, UInt64 } from "@wharfkit/antelope";
import { Campaign, InitBatch } from "./../types/campaign";
import Ajv from "ajv";
import { ChainAPI } from "@wharfkit/antelope";

// export class UtilityService {
//     constructor(private readonly client: Client) {}
// }

export const validateBatchData = async (
    batch: InitBatch,
    campaign: Campaign,
) => {
    const ajv = new Ajv();
    if (!campaign.info?.input_schema) {
        // throw new Error('Campaign input schema is not defined')
        return true;
    }
    const validate = ajv.compile(campaign.info?.input_schema);
    const valid = validate(batch.data);
    if (!valid) {
        console.error(validate?.errors);
        throw new Error(`Batch data is invalid: ${validate?.errors}`);
    }
};

export const validateCampaignSchema = (campaign: Campaign): boolean => {
    const ajv = new Ajv();
    if (!campaign.info?.input_schema) {
        // throw new Error('Campaign input schema is not defined')
        return true;
    }
    const valid = ajv.validateSchema(campaign.info?.input_schema);
    if (valid) {
        return true;
    } else {
        console.error(ajv.errors);
        throw new Error(`Campaign schema is invalid: ${ajv.errors}`);
    }
};

export function createCompositeU64Key(lowerId: number, upperId: number) {
    // Check if lowerId or upperId isn't of type number
    if (typeof lowerId !== "number" || typeof upperId !== "number") {
        throw new TypeError("Both lowerId and upperId must be numbers");
    }

    const byteArray = new Uint8Array(8);
    byteArray.set(UInt32.from(lowerId).byteArray, 0);
    byteArray.set(UInt32.from(upperId).byteArray, 4);

    return UInt64.from(byteArray);
}

export enum TxState {
    EXECUTED = "EXECUTED",
    SOFT_FAIL = "soft_fail",
    HARD_FAIL = "hard_fail",
    EXPIRED = "EXPIRED",
    IRREVERSIBLE = "IRREVERSIBLE",
    IN_BLOCK = "IN_BLOCK",
}

export function waitForTransaction(
    transactionId: Checksum256Type,
    context: ChainAPI,
    state: TxState = TxState.IRREVERSIBLE,
    maxRetries = 3,
) {
    {
        return new Promise((resolve, reject) => {
            let attempt = 0;
            const interval = setInterval(async () => {
                try {
                    attempt++;
                    const response =
                        await context.get_transaction_status(transactionId);
                    if (
                        response.state == TxState.SOFT_FAIL ||
                        response.state == TxState.HARD_FAIL ||
                        response.state == TxState.EXPIRED
                    ) {
                        clearInterval(interval);
                        reject(response);
                    }

                    if (response?.state === state) {
                        clearInterval(interval);
                        resolve(response);
                    }
                } catch (error) {
                    if (attempt > maxRetries) {
                        clearInterval(interval);
                        reject(error);
                    }
                }
            }, 3000);
        });
    }
}
