import { ErrorResponse } from "./error-response";
export declare namespace ServicesBase {
    function buildUrl(url: string): string;
    function get<T>(url: string): Promise<T | ErrorResponse>;
    function post<T>(url: string, body: any): Promise<T | ErrorResponse>;
}
