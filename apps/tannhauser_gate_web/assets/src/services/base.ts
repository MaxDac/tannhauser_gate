import {ErrorResponse} from "./error-response";

export function buildUrl(url: string): string {
    return `${window.location.origin}/api${url}`;
}

export function socketUrl(): string {
    return process.env.NODE_ENV === "development" ?
        "ws://localhost:4000/socket" :
        "/socket";
}

export function get<T>(url: string): Promise<T | ErrorResponse> {
    const completeUrl = buildUrl(url);

    return fetch(completeUrl, {
        method: "GET",
        credentials: "include"
    })
        .then(res => res.json())
        .then(js => js as T)
}

export function post<T>(url: string, body: any): Promise<T | ErrorResponse> {
    const completeUrl = buildUrl(url);

    return fetch(completeUrl, {
        method: "POST",
        credentials: "include",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(js => js as T);
}
