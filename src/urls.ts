const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

const urls = {
    CONFIG : '/api/_allauth/browser/v1/config',
    LOGIN : '/api/_allauth/browser/v1/auth/login',
    AUTH : '/api/_allauth/browser/v1/auth/session',
    TICKET_LIST : '/api/ticket-list/',
    STAFF_LIST : '/api/staff-list/',
    RESIDENT_LIST : '/api/resident-list/',
    SOCIETY_DETAILS : '/api/society-details/',
    SESSION_EXPIRY: '/api/session-expiry',
    CONSENT_STATUS: '/api/consent-status/',
    CONSENT_UPDATE: '/api/consent/',
    CONSENT_LIST: '/api/consent-list/'

}

export function generateUrl(path: keyof typeof urls) {
    return `${baseUrl}${urls[path]}`;
}

