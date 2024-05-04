import type { Client } from "../../client";
import { Bytes } from "@wharfkit/antelope";

export type UploadIpfsResourceArgs = {
	client: Client;
	data: Record<string, unknown>;
};

export const uploadIpfsResource = async ({
	client,
	data,
}: UploadIpfsResourceArgs) => {
	try {
		const { ipfs } = client.network.config;

		const blob = new Blob([JSON.stringify(data)], {
			type: "application/json",
		});

		const formData = new FormData();
		formData.append("file", blob);

		if (blob.size > 1024 * 1024 * 10) {
			throw new Error("File too large, max file size is: 10MB");
		}
		const requestOptions: RequestInit = {
			method: "POST",
			body: formData,
		};

		const response = await client.fetchProvider.fetch(
			`${ipfs.ipfsEndpoint}/api/v0/add?pin=true`,
			requestOptions,
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error in IPFS upload: ${errorText}`);
		}
		const json = await response.json();
		return json.Hash as string;
	} catch (error: unknown) {
		console.error("Error in IPFS upload", error);
		throw error;
	}
};

export const ipfsCIDToHex = (cid: string) : string => {
	const string = atob(cid);
	const array = new Uint8Array(string.length)
	for (let i = 0; i < string.length; i++) {
		array[i] = string.charCodeAt(i)
	}
	return Bytes.from(array).hexString;
}
