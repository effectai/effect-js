import type { Client } from "../../client";

export enum IpfsContentFormat {
  FormData = "formdata",
  ArrayBuffer = "arraybuffer",
  Blob = "blob",
  Text = "text",
  JSON = "json",
}

export type CachedItem = {
  data: unknown;
  timestamp: number;
};

export const getIpfsResource = async (
  client: Client,
  hash: string,
  ipfsContentForm: IpfsContentFormat = IpfsContentFormat.JSON
) => {
  try {
    const { ipfs } = client.network.config;
    const { ipfsCacheDurationInMs } = client.options;
    const cache = client.cache;
    const cacheKey = `${hash}-${ipfsContentForm}`;

    if (ipfsCacheDurationInMs) {
      // Create a cache key
      const cacheKey = `${hash}-${ipfsContentForm}`;

      const cachedItem = (await cache.get(cacheKey)) as CachedItem | undefined;
      // If we have the response cached, return it
      if (
        cachedItem &&
        Date.now() < cachedItem.timestamp + ipfsCacheDurationInMs
      ) {
        return cachedItem.data;
      }
    }

    const data = await client.fetchProvider.fetch(
      `${ipfs.ipfsEndpoint}/ipfs/${hash}`
    );

    let result;
    // Return the IPFS content in the format you want
    switch (ipfsContentForm) {
      case IpfsContentFormat.FormData:
        result = data.formData();
        break;
      case IpfsContentFormat.ArrayBuffer:
        result = data.arrayBuffer();
        break;
      case IpfsContentFormat.Blob:
        result = data.blob();
        break;
      case IpfsContentFormat.Text:
        result = data.text();
        break;
      case IpfsContentFormat.JSON:
        result = await data.json();
        break;
      default:
        result = data;
        break;
    }

    // After we got the result, cache it
    if (ipfsCacheDurationInMs) {
      cache.set(cacheKey, { data: result, timestamp: Date.now() });
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};
