import { type Client } from "../client";
import { DaoConfig } from "../types/campaign";

export class DaoService {
    constructor (private readonly client: Client) {}

    getConfig = async (): Promise<DaoConfig> => {
        try {
            const { rows } = await this.client.eos.v1.chain.get_table_rows({
                code: this.client.config.daoContract,
                scope: this.client.config.daoContract,
                table: 'config',
                limit: 1
            })
            const [ config ] = rows
            return config
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    }

}
