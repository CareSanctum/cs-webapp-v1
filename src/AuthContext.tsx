import { createContext, useContext, useEffect } from "react";
import { useAuthStatus } from "./hooks/authStatus.hook";
import { useLocation, useNavigate } from "react-router";

const AuthContext = createContext(null);

export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return ctx;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, isLoading, isError, error } = useAuthStatus();
    const navigate = useNavigate();
    const location = useLocation();

    // Determine auth status from API response or error
    let isAuthenticated = false;
    let user = null;
    let statusCode = null;

    if (data) {
        isAuthenticated = true;
        user = data.user || null;
        statusCode = 200;
    } else if (isError) {
        // Try to get status from error object
        const err = error as any;
        if (err?.response?.status) {
            statusCode = err.response.status;
        } else if (err?.message?.includes('401')) {
            statusCode = 401;
        } else if (err?.message?.includes('410')) {
            statusCode = 410;
        }
    }

    useEffect(() => {
        if (isLoading) return;
        // If not authenticated (401/410), redirect to login (unless already there)
        if ((statusCode === 401 || statusCode === 410) && location.pathname !== '/login') {
            navigate('/login', { replace: true });
        }
        // If authenticated and on login, redirect to home
        if (isAuthenticated && location.pathname === '/login') {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, statusCode, isLoading, location.pathname, navigate]);

    // Optionally, show a loading indicator while checking auth
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        if (
            statusCode === 401 ||
            statusCode === 410
        ) {
            // Not authenticated, let redirect happen, but always render children on login/signup/verify-email
            if (
                location.pathname === '/login' ||
                location.pathname === '/signup' ||
                location.pathname === '/verify-email'
            ) {
                return <AuthContext.Provider value={{ isAuthenticated, statusCode }}>{children}</AuthContext.Provider>;
            }
            // For all other routes, let ProtectedRoute handle the redirect
            return null;
        }
        // For all other errors, show the error message
        return <div>Error: {error?.message || 'Unknown error'}</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, statusCode }}>
            {children}
        </AuthContext.Provider>
    );
}

