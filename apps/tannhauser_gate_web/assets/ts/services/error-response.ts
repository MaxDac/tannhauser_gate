export interface ErrorResponse {
    errors: string[];
}

const noResponseError = {
    errors: [
        "No response"
    ]
}

export function checkResponse(response: any): boolean {
    return response !== undefined &&
        (response.errors === undefined ||
            response.errors.length === 0);
}

export function getError(response: any): ErrorResponse {
    if (response === undefined || response.errors === undefined || response.errors.length === 0) {
        return noResponseError
    }

    return response as ErrorResponse
}
