import { UInt32, UInt64 } from "@wharfkit/antelope";
import type { Client } from "../../../client";
import { useEFXContracts } from "../../../utils/state";
import { createCompositeU64Key } from "../../../utils/keys";
import type { Reservation } from "../../../types/campaign";
import { GetTableRowsResponse } from "../../../types/helpers";

// Private helper function to get reservations
const _getReservations = async (
  client: Client,
  lowerBound?: UInt64,
  upperBound?: UInt64,
  indexPosition: "secondary" | "fourth" = "secondary",
) => {
  const { tasks } = useEFXContracts(client);

  return (await client.provider.v1.chain.get_table_rows({
    scope: tasks,
    code: tasks,
    table: "reservation",
    index_position: indexPosition,
    upper_bound: upperBound,
    lower_bound: lowerBound,
  })) as GetTableRowsResponse<UInt64, Reservation>;
};

export const getReservations = async (client: Client) => {
  try {
    return _getReservations(client);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReservationsForCampaign = async (
  client: Client,
  campaignId: number,
) => {
  try {
    const lowerBound = createCompositeU64Key(campaignId, 0);
    const upperBound = createCompositeU64Key(campaignId, Number(UInt32.max()));

    return _getReservations(client, lowerBound, upperBound);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getReservationsForVAccount = async (
  client: Client,
  vAccountId: number,
) => {
  try {
    if (!vAccountId) throw new Error("vAccountId is required");

    const data = await _getReservations(
      client,
      UInt64.from(vAccountId),
      UInt64.from(vAccountId),
      "fourth",
    );

    return data.rows;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getReservationForCampaign = async (
  client: Client,
  campaignId: number,
  vAccountId: number,
) => {
  try {
    const bound = createCompositeU64Key(campaignId, vAccountId);
    const data = await _getReservations(client, bound, bound);
    return data.rows[0];
  } catch (e) {
    console.error(e);
    throw e;
  }
};
