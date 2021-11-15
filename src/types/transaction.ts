/**
 * Transaction interface
 */

export interface Transaction {
    id: string;
    amount: number;
    date: Date;
    description: string;
    type: string;
    category: string;
    account: string;

}