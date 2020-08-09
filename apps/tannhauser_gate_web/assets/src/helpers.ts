export function clone<T>(obj: T | undefined): T | undefined {
    if (obj === undefined) {
        return undefined
    }
    return JSON.parse(JSON.stringify(obj)) as T
}

const cookieExpirationDate = '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain='

const cookieEmptyPath = ' ;path='

function drop<T>(arr: T[], howMany: number): T[] {
    if (howMany == 0) return arr
    if (howMany > arr.length) return []

    return arr.filter((v, idx, _) => idx >= howMany)
}

export function last<T>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined

    return arr[arr.length - 1]
}

export function clearCookies() {
    const cookies = document.cookie.split(";")
    const domainParts = window.location.hostname.split(".")
    const locationParts = window.location.pathname.split("/")

    for (const cookie of cookies) {
        domainParts.forEach((v, idx, _) => {
            const cookieBase =
                `${
                    encodeURIComponent(cookie.split(";")[0].split("=")[0])
                }}${cookieExpirationDate}${drop(domainParts, idx).join(".")}${cookieEmptyPath}`
            document.cookie = `${cookieBase}/`

            locationParts.forEach((p, idx, _) => {
                document.cookie = `${cookieBase}${drop(locationParts, idx).join("/")}`
            })
        })
    }
}

export function arrayBufferToBase64(ab: ArrayBuffer): string {
    const typedArray = new Uint8Array(ab) as unknown as number[]
    const maxSize = 1000
    let stringChar = ""

    const doItWithReduce = (ta: number[]) =>
        ta.reduce((data, byte) => data + String.fromCharCode(byte), "")

    if (ab.byteLength <= maxSize) {
        try {
            stringChar = String.fromCharCode.apply(null, typedArray)
        }
        catch {
            console.log("doing it with reduce after exception")
            stringChar = doItWithReduce(typedArray)
        }
    }
    else {
        console.log("doing it with reduce")
        stringChar = doItWithReduce(typedArray)
    }

    return window.btoa(stringChar)
}

export function reloadFromServer(path: string) {
    window.location.href = path
    window.location.reload()
}

export function getUserToken(): string {
    const token = (window as any)?.userToken

    if (token !== undefined) {
        return token
    }

    return ""
}
