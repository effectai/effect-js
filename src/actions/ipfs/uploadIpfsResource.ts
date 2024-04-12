import type { Client } from "../../client";

export const uploadIpfsResource = async (client: Client, obj: unknown) => {
  try {
    const { ipfs } = client.network.config;

    const blob = new Blob([JSON.stringify(obj)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("file", blob);

    if (blob.size > 1024 * 1024 * 10) {
      throw new Error("File too large, max file size is: 10MB");
    } else {
      const requestOptions: RequestInit = {
        method: "POST",
        body: formData,
      };

      const response = await client.fetchProvider.fetch(
        `${ipfs.ipfsEndpoint}/api/v0/add?pin=true`,
        requestOptions
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error in IPFS upload: ${errorText}`);
      } else {
        const json = await response.json();
        return json.Hash as string;
      }
    }
  } catch (error: unknown) {
    console.error("Error in IPFS upload", error);
    throw error;
  }
};
