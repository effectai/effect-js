import { Client } from "../client";
import store from 'store2'
import { Blob, FormData } from '@web-std/fetch'

export enum IpfsContentFormat {
  FormData = 'formdata',
  ArrayBuffer = 'arraybuffer',
  Blob = 'blob',
  Text = 'text',
  JSON = 'json'
}

export class IpfsService {
    constructor(private client: Client) {}

    upload = async (obj: object): Promise<string> => {
      try {
        const stringified = JSON.stringify(obj)
        const blob = new Blob([stringified], { type: 'application/json' })
        const formData = new FormData()
        const blobText = await blob.text()
        formData.append('file', blob)

        if (blob.size > 1024 * 1024 * 10) {
          throw new Error('File too large, max file size is: 10MB')
        } else {
          const requestOptions: RequestInit = {
            method: 'POST',
            body: formData,
          }
          const response = await this.client.fetchProvider.fetch(`${this.client.config.ipfsEndpoint}/api/v0/add?pin=true`, requestOptions)
          if (!response.ok) {
            const errorText = await response.text()
            console.error(errorText)
            throw new Error('Error uploading file to IPFS')
          } else {
            const json = await response.json()
            return json.Hash as string
          }
        }
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    }

  /**
   * Get IPFS Content in JSON, without caching, to be in getIpfsContent. 
   * @param {string} hash - hash of the IPFS content you want to fetch
   * @param {IpfsContentFormat} format - format of the content you are fetching, 
   * @returns content of the ipfs hash in your preferred format
   */
  fetch = async (hash: string, ipfsContentForm: IpfsContentFormat): Promise<any> => {
    try {
      let data: { formData: () => any; arrayBuffer: () => any; blob: () => any; text: () => any; json: () => any; };

      // Use store2 to cache the IPFS content, chekc config and if it is cached, return it
      if (this.client.config.ipfsCache && store.has(hash)) {
        data = store.get(hash)
      } else {
        // Fetch the IPFS content
        data = await this.client.fetchProvider.fetch(`${this.client.config.ipfsEndpoint}/ipfs/${hash}`)
  
        // Cache the IPFS content
        if (this.client.config.ipfsCache) {
          store.set(hash, data)
        }
      }
  
      // Return the IPFS content in the format you want
      switch (ipfsContentForm) {
        case IpfsContentFormat.FormData:
          return data.formData()
        case IpfsContentFormat.ArrayBuffer:
          return data.arrayBuffer()
        case IpfsContentFormat.Blob:
          return data.blob()
        case IpfsContentFormat.Text:
          return data.text()
        case IpfsContentFormat.JSON:
          return await data.json()
        default:
          return data
      }
    } catch (error) {
      console.error(error)
    }
      
  }
}
