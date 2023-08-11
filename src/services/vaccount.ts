import { Client } from '../client';

export class VAccountService {
    constructor(private client: Client) {}

    async vtransfer(from_id: number, to_id: number, quantity: string) {
        const transferAction = {
            account: this.client.config.vaccountContract,
            name: "vtransfer",
            authorization: [this.client.session.permissionLevel],
            data: {
                from_id: from_id,
                to_id: to_id,
                quantity: {
                    quantity: quantity,
                    contract: this.client.config.tokenContract,
                },
                memo: "",
                payer: this.client.session.actor,
                sig: null,
                fee: null,
            },
        }
        return this.client.session.transact({ action: transferAction });
    }
};
