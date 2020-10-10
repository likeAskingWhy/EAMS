const sign = 'token'

export function getToken() {
    return sessionStorage.getItem(sign)
}

export function setToken(token) {
    return sessionStorage.setItem(sign, token)
}

export function removeToken() {
    return sessionStorage.removeItem(sign)
}