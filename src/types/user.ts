export interface VAccount {
    id: number;
    nonce: number;
    address: [string, string];
    balance: {
        quantity: string;
        contract: string;
    };
}
