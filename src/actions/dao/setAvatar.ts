import type { IAssetRow } from "atomicassets/build/API/Rpc/RpcCache";
import type { Client } from "../../client";
import { SessionNotFoundError } from "../../errors";
import { useEFXContracts } from "../../utils/state";

export type SetAvatarArgs = {
	client: Client;
	asset: IAssetRow;
};

export const setAvatar = async ({ client, asset }: SetAvatarArgs) => {
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
