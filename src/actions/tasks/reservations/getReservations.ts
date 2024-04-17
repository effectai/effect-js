import { UInt32, UInt64 } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import type { GetTableRowsResponse, Serialized } from "../../../types/helpers";
import { createCompositeU64Key } from "../../../utils/keys";
import { useEFXContracts } from "../../../utils/state";
import type { Reservation } from "../../../@generated/types/effecttasks2";

export type GetReservationsArgs = {
  client: Client;
  lowerBound?: UInt64;
  upperBound?: UInt64;
  indexPosition?: "secondary" | "fourth";
};

export const getReservations = async ({
  client,
  lowerBound,
  upperBound,
  indexPosition = "secondary",
}: GetReservationsArgs) => {
  const { tasks } = useEFXContracts(client);

  return (await client.provider.v1.chain.get_table_rows({
    scope: tasks,
    code: tasks,
    table: "reservation",
    index_position: indexPosition,
    upper_bound: upperBound,
    lower_bound: lowerBound,
  })) as GetTableRowsResponse<UInt64, Serialized<Reservation>>;
};

export type GetReservationsForCampaignArgs = {
  client: Client;
  campaignId: number;
};

export const getReservationsForCampaign = async ({
  client,
  campaignId,
}: GetReservationsForCampaignArgs) => {
  try {
    const lowerBound = createCompositeU64Key(campaignId, 0);
    const upperBound = createCompositeU64Key(campaignId, Number(UInt32.max));
    const { rows } = await getReservations({ client, lowerBound, upperBound });
    return rows;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export type GetReservationForVAccountArgs = {
  client: Client;
  vAccountId: number;
};

export const getReservationsForVAccount = async ({
  client,
  vAccountId,
}: GetReservationForVAccountArgs) => {
  try {
    if (!vAccountId) throw new Error("vAccountId is required");

    const data = await getReservations({
      client,
      lowerBound: UInt64.from(vAccountId),
      upperBound: UInt64.from(vAccountId),
      indexPosition: "fourth",
    });

    return data.rows;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export type GetReservationForCampaignArgs = {
  client: Client;
  campaignId: number;
  vAccountId: number;
};

export const getReservationForCampaign = async ({
  client,
  campaignId,
  vAccountId,
}: GetReservationForCampaignArgs) => {
  try {
    const bound = createCompositeU64Key(campaignId, vAccountId);
    const data = await getReservations({
      client,
      lowerBound: bound,
      upperBound: bound,
    });

    return data.rows[0];
  } catch (e) {
    console.error(e);
    throw e;
  }
};
