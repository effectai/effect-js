import { UInt128 } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import type { Campaign } from "../../../types/campaign";
import { getIpfsResource } from "../../ipfs/getIpfsResource";

export const getCampaigns = async (
  client: Client,
  ipfsFetch: boolean = true,
): Promise<Campaign[]> => {
  const { contracts } = client.network.config.efx;
  const provider = client.provider;

  const rows: Campaign[] = [];
  const boundDelta = 20;
  let lowerBound: UInt128 = UInt128.from(0);
  let upperBound: UInt128 = UInt128.from(boundDelta);
  let more = true;

  while (more) {
    const response = await provider.v1.chain.get_table_rows({
      code: contracts.tasks,
      table: "campaign",
      scope: contracts.tasks,
      lower_bound: lowerBound,
      upper_bound: upperBound,
    });

    rows.push(...response.rows);

    if (response.more) {
      const lastRow = response.rows[response.rows.length - 1];
      lowerBound = UInt128.from(lastRow.id + 1);
      upperBound = UInt128.from(lastRow.id + boundDelta);
    } else {
      more = false;
    }
  }

  if (ipfsFetch) {
    for (const campaign of rows) {
      campaign.info = await getIpfsResource(client, campaign.content.field_1);
    }
  }

  return rows;
};

export const getCampaign = async (
  client: Client,
  id: number,
): Promise<Campaign> => {
  const { contracts } = client.network.config.efx;

  try {
    const response = await client.provider.v1.chain.get_table_rows({
      code: contracts.tasks,
      table: "campaign",
      scope: contracts.tasks,
      lower_bound: UInt128.from(id),
      upper_bound: UInt128.from(id),
      limit: 1,
    });

    const [campaign] = response.rows;
    campaign.info = await getIpfsResource(client, campaign.content.field_1);
    return campaign;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
