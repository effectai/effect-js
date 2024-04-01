import { UInt32, UInt64 } from "@wharfkit/antelope";
import { Client } from "../../../client";
import { createCompositeU64Key, useEFXContracts } from "../../../utils";
import { Reservation } from "../../../types";
import { GetTableRowsResponse } from "../../../types/helpers";

// Private helper function to get reservations
const _getReservations = async (
  client: Client,
  lowerBound?: UInt64,
  upperBound?: UInt64,
) => {
  const { tasks } = useEFXContracts(client);

  return (await client.provider.v1.chain.get_table_rows({
    scope: tasks,
    code: tasks,
    table: "reservation",
    index_position: "secondary",
    upper_bound: lowerBound,
    lower_bound: upperBound,
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
  const lowerBound = createCompositeU64Key(campaignId, 0);
  const upperBound = createCompositeU64Key(campaignId, Number(UInt32.max));
  return _getReservations(client, lowerBound, upperBound);
};

export const getReservationsForVAccount = async (
  client: Client,
  vAccountId: number,
) => {
  const lowerBound = createCompositeU64Key(0, vAccountId);
  const upperBound = createCompositeU64Key(0, Number(UInt32.max));
  return _getReservations(client, lowerBound, upperBound);
};

export const getReservationForCampaign = async (
  client: Client,
  campaignId: number,
  vAccountId: number,
) => {
  const key = createCompositeU64Key(campaignId, vAccountId);
  return _getReservations(client, key, key);
};
