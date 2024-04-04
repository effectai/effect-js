import type { Client } from "../../client";
import { useLocalStorageApi } from "../../utils/storage";

export enum IpfsContentFormat {
  FormData = "formdata",
  ArrayBuffer = "arraybuffer",
  Blob = "blob",
  Text = "text",
  JSON = "json",
}

export const getIpfsResource = async (
  client: Client,
  hash: string,
  ipfsContentForm: IpfsContentFormat = IpfsContentFormat.JSON,
) => {
  try {
    //clear local storage

    const { ipfs } = client.network.config;
    const { ipfsCacheDurationInMs } = client.options;

    const localStorage = await useLocalStorageApi();

    const cacheKey = `${hash}-${ipfsContentForm}`;

    if (ipfsCacheDurationInMs) {
      // Create a cache key
      const cacheKey = `${hash}-${ipfsContentForm}`;
      const cachedItem = localStorage.getItem(cacheKey);

      // If we have the response cached, return it
      if (cachedItem !== null) {
        const parsedItem = JSON.parse(cachedItem);
        if (
          parsedItem &&
          Date.now() < parsedItem.timestamp + ipfsCacheDurationInMs
        ) {
          return parsedItem.data;
        }
      }
    }

    const data = await client.fetchProvider.fetch(
      `${ipfs.ipfsEndpoint}/ipfs/${hash}`,
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
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: result, timestamp: Date.now() }, null, 2),
      );
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};
