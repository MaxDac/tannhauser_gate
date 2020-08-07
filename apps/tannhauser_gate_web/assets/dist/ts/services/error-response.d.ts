export interface ErrorResponse {
    errors: string[];
}
export declare function checkResponse(response: any): boolean;
export declare function getError(response: any): ErrorResponse;
export declare function formatError(e: ErrorResponse, title: string): string;
