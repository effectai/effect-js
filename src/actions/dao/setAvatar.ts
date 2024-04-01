import { Client } from "../../client";
import { AtomicAsset } from "../../types/campaign";
import { useEFXContracts } from "../../utils";
import { useSession } from "../session";

/**
 * Set the avatar asset for the given account
 * @param client
 * @param asset
 */
export const setAvatar = async (client: Client, asset: AtomicAsset) => {
  const { actor, permission, transact } = useSession(client);
  const { dao } = useEFXContracts(client);

  const response = await transact({
    actions: [
      {
        account: dao,
        name: "setavatar",
        authorization: [
          {
            actor,
            permission,
          },
        ],
        data: {
          account: actor,
          asset_id: asset.asset_id,
        },
      },
    ],
  });

  return response;
};
