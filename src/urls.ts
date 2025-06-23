const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

const urls = {
    CONFIG : '/api/_allauth/browser/v1/config',
    LOGIN : '/api/_allauth/browser/v1/auth/login',
    AUTH : '/api/_allauth/browser/v1/auth/session',
    TICKET_LIST : '/api/ticket-list/',
    STAFF_LIST : '/api/staff-list/',
    RESIDENT_LIST : '/api/resident-list/'

}

export function generateUrl(path: keyof typeof urls) {
    return `${baseUrl}${urls[path]}`;
}

