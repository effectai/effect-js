import type { Client } from "../../client";
import { SessionNotFoundError } from "../../errors";
import type { AtomicAsset } from "../../types/campaign";
import { useEFXContracts } from "../../utils/state";

/**
 * Set the avatar asset for the given account
 * @param client
 * @param asset
 */
export const setAvatar = async (client: Client, asset: AtomicAsset) => {
	if (!client.session) {
		throw new SessionNotFoundError("Session is required for this method.");
	}

	const { actor, permission, transact } = client.session;
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
