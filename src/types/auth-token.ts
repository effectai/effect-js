export type AuthToken = ApiTokenInfo;

export type ApiTokenInfo = {
    access_token: string;
    expires_at: number;
    token_type: string;
    refresh_token: string;
    scope: string;
    created_at: number;
};