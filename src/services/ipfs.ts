import { Client } from "../client";

export class IpfsService {
    constructor(private client: Client) {}

  /**
   * Get IPFS Content in JSON, without caching, to be in getIpfsContent. 
   * @param hash - hash of the IPFS content you want to fetch
   * @param format - format of the content you are fetching.
   * @returns content of the ipfs hash in your preferred format
   */
  getIpfsData = async (hash: string, format: string): Promise<any> => {
    const data = await this.client.fetchProvider.fetch(`${this.client.config.ipfsEndpoint}/ipfs/${hash}`)
    switch (format.toLowerCase()) {
      case 'formdata':
      case 'form':
        return data.text()
      case 'buffer':
      case 'arraybuffer':
      case 'array':
        return data.arrayBuffer()
      case 'blob':
        return data.blob()
      case 'text':
        return data.text()
      case 'json':
        return await data.json()
    }
  }
}