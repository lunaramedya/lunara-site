type BasePayload = {
    name?: string;
    phone?: string;
};
export type ContactPayload = BasePayload & {
    kind: 'contact';
    company?: string;
    email?: string;
    message?: string;
};
export type LeadPayload = BasePayload & {
    kind: 'lead';
    service?: string;
};
export type MailPayload = ContactPayload | LeadPayload;
type EnvSource = Record<string, string | undefined>;
type ApiResult = {
    status: number;
    body: {
        ok: boolean;
        message: string;
    };
};
export declare function submitMailRequest(payload: unknown, env: EnvSource): Promise<ApiResult>;
export declare function readJsonBody(request: AsyncIterable<Uint8Array>): Promise<any>;
export {};
