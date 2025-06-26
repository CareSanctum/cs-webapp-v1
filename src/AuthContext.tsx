import { createContext, useContext, useEffect } from "react";
import { useAuthStatus } from "./hooks/authStatus.hook";
import { useLocation, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "./store/AuthStore";

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
    const setusername = useAuthStore(state => state.setusername)

    // Determine auth status from API response or error
    let isAuthenticated = false;
    let user = null;
    let statusCode = null;

    //set status code 
    if (isError) {
        const err = error as any;
        statusCode = err?.response?.status;
    }

    useEffect(() => {
        if (statusCode === 401 || statusCode === 410) {
          navigate('/login', { replace: true });
        }
      }, [statusCode, navigate]);

    // loading state
    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    // error state
    if (isError && statusCode !== 401 && statusCode !== 410) {
        return (
          <div className="h-screen w-screen flex items-center justify-center">
            Something went wrong. Please try again later.
          </div>
        );
      }

    if (data) {
        isAuthenticated = true;
        statusCode = 200;
        
    }
    setusername(data?.data?.user?.username);
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, statusCode }}>
            {children}
        </AuthContext.Provider>
    );
}

