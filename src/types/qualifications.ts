export interface Qualification {
    id: number;
    account_id: number;
    info?: {
        name: string;
        description: string;
        image: string;
        ishidden?: boolean;
    }
    content: {
        field_0: number;
        field_1: string;
    };
}