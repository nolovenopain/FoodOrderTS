import AlertCus from "../viewCustom/alertCustom"

export const sessionExpired = () => {
    AlertCus.Alert('Lỗi', 'sessionExpired', () => {})
}

export const badRequest = () => {
    AlertCus.Alert('Lỗi', 'badRequest', () => {})
}

export const serverError = () => {
    AlertCus.Alert('Lỗi', 'serverError', () => {})
}

export const notFound = () => {
    AlertCus.Alert('Lỗi', 'notFound', () => {})
}

export const notPermission = () => {
    AlertCus.Alert('Lỗi', 'notPermission', () => {})
}

export const otherError = () => {
    AlertCus.Alert('Lỗi', 'otherError', () => {})
}