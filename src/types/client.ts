/**
 * The client interface, is the backbone of this library.
 * The client should contain only top-level functions to interface with Effect.
 * 
 * Suggested requirements for the client:
 * - Management of Api key, (api token retrieval and freshness and persistence
 * - Abstract Effect API into simple to use top-level methods
 * - Error handling wrapping eror received via REST.
 */
export interface Client {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    deleted: boolean;
    client_id: string;
    client_secret: string;
}
