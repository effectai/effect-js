import { AnyAction, ExtendedAsset, Name } from "@wharfkit/antelope";
import { Client } from "../../exports";

export const withdraw = async (client: Client, quantity: ExtendedAsset) => {
  if (!client.session?.vAccount) {
    throw new Error("vAccount is not set.");
  }

  const { transact, actor, authorization } = client.session;
  const { contracts } = client.network.config.efx;

  const action = withdrawAction({
    from_id: client.session.vAccount.id,
    to_account: actor,
    quantity,
    account: contracts.vaccount,
    authorization,
    memo: "",
  });

  return await transact({ action });
};

export const withdrawAction = ({
  from_id,
  to_account,
  quantity,
  account,
  authorization,
}: {
  from_id: number;
  to_account: Name;
  quantity: ExtendedAsset;
  account: string;
  memo: string;
  authorization: { actor: Name; permission: Name }[];
}): AnyAction => {
  return {
    account,
    name: "withdraw",
    authorization,
    data: {
      from_id,
      to_account,
      quantity,
      memo: "",
    },
  };
};
