import { type Client } from "../client";
import { get, set } from "idb-keyval";

export enum IpfsContentFormat {
  FormData = "formdata",
  ArrayBuffer = "arraybuffer",
  Blob = "blob",
  Text = "text",
  JSON = "json",
}

export class IpfsService {
  constructor(private readonly client: Client) {}

  upload = async (obj: unknown) => {
    try {
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

        const { ipfs } = this.client.useConfig();

        const response = await this.client.fetchProvider.fetch(
          `${ipfs.ipfsEndpoint}/api/v0/add?pin=true`,
          requestOptions,
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

  /**
   * Get IPFS Content in JSON, without caching, to be in getIpfsContent.
   * @param {string} hash - hash of the IPFS content you want to fetch
   * @param {IpfsContentFormat} format - format of the content you are fetching,
   * @returns content of the ipfs hash in your preferred format
   */
  fetch = async (
    hash: string,
    ipfsContentForm: IpfsContentFormat = IpfsContentFormat.JSON,
    CACHE_TIME_IN_MS = 600_000,
  ) => {
    try {
      const { ipfs } = this.client.useConfig();
      const { ipfsCache } = this.client.useOptions();
      const cacheKey = `${hash}-${ipfsContentForm}`;

      if (ipfsCache) {
        // Create a cache key
        const cacheKey = `${hash}-${ipfsContentForm}`;

        // If we have the response cached, return it
        const cachedItem = await get(cacheKey);
        if (
          cachedItem &&
          Date.now() < cachedItem.timestamp + CACHE_TIME_IN_MS
        ) {
          return cachedItem.data;
        }
      }

      const data = await this.client.fetchProvider.fetch(
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
      if (ipfsCache) {
        await set(cacheKey, { data: result, timestamp: Date.now() });
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  };
}
