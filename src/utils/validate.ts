import Ajv from "ajv";
import type { Campaign, InitBatch } from "../types/campaign";

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
