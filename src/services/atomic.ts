import { type Client } from "../client";

export class AtomicAssetsService {
    constructor (private readonly client: Client) {}

    getAtomicAssets = async (): Promise<any> => {
        // TODO: Retrieve atomic assets
        const { rows } = await this.client.eos.v1.chain.get_table_rows({
            code: this.client.config.atomicAssetsContract,
            scope: this.client.config.atomicAssetsContract,
            table: 'config',
            limit: 1
        })
        const [ config ] = rows
        return config
    }

}
