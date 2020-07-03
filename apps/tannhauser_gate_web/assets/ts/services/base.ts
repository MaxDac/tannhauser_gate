export function buildUrl(url: string): string {
    return `${window.location.origin}/${url}`;
}

export function post<T>(url: string, body: any): Promise<T> {
    const completeUrl = buildUrl(url);
    console.log(`calling ${completeUrl}`);
    return fetch(completeUrl, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(js => js as T);
}
