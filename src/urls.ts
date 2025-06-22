const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

const urls = {
    CONFIG : '/api/_allauth/browser/v1/config',
    LOGIN : '/api/_allauth/browser/v1/auth/login',
    LOGOUT : '/api/_allauth/browser/v1/auth/session',
    TICKET_LIST : '/api/ticket-list/'

}

export function generateUrl(path: keyof typeof urls) {
    return `${baseUrl}${urls[path]}`;
}

