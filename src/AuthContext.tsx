import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    ReactNode,
  } from 'react';
  import { Navigate, useLocation } from 'react-router';
  import { useQueryClient } from '@tanstack/react-query';
  import { Loader2 } from 'lucide-react';
  
  import { useAuthStatus } from './hooks/authStatus.hook';
  import { useConsentStatus } from './hooks/consent.hook';
  import { useAuthStore } from './store/AuthStore';
  
  type ConsentPayload = { role?: string; consent: any } | null;
  type AuthCtx = {
    isAuthenticated: boolean;
    authStatusCode: number | null;
    user: any | null;
    consent: ConsentPayload;
  };
  
  const AuthContext = createContext<AuthCtx | null>(null);
  export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext must be used within an AuthProvider');
    return ctx;
  };
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    /* ───────────────────────────── queries ─────────────────────────────── */
    const {
      data: authResp,
      isLoading: authLoading,
      isError: authError,
      error: authErrObj,
    } = useAuthStatus();
  
    const isAuthenticated = !!authResp;
  
    const {
      data: consentResp,
      status: consentStatus,
      error: consentErrObj,
    } = useConsentStatus(isAuthenticated); // only runs when logged-in
  
    /* ─────────────────────── codes & derived booleans ───────────────────── */
    const authStatusCode = (authErrObj as any)?.response?.status ?? null;
    const consentStatusCode = (consentErrObj as any)?.response?.status ?? null;
  
    const isUnauthenticated = authStatusCode === 401 || authStatusCode === 410;
    const consentNotRequired = isAuthenticated && (consentStatusCode === 403 || (consentResp && consentResp.role && consentResp.role !== "USERS"));
    const consentRequiredButMissing =
      isAuthenticated && !consentNotRequired && consentResp?.consent === null;
  
    /* ───────────────────────── side-effects ─────────────────────────────── */
    const location = useLocation();
    const queryClient = useQueryClient();
    const setUsername = useAuthStore((s) => s.setusername);
  
    /* refresh consent **once** after the first successful auth  */
    const consentBootstrapped = useRef(false);

    useEffect(() => {
      if (!isAuthenticated) return;                 // still logged-out
      if (consentBootstrapped.current) return;      // already done
    
      consentBootstrapped.current = true;
      queryClient.refetchQueries({ queryKey: ['consent-status'] });
    }, [isAuthenticated, queryClient]);
  
    /* stash username globally */
    useEffect(() => {
      const username = authResp?.data?.user?.username;
      if (username) {
        console.log('Setting username in store:', username);
        setUsername(username);
      }
    }, [authResp?.data?.user?.username]);
  
    /* ─────────────────── normalise consent payload ──────────────────────── */
    const consentData: ConsentPayload = useMemo(() => {
        if (consentNotRequired && !consentResp) {
          return { role: authResp?.data?.user?.role, consent: 'N/A' };
        }
        return consentResp ?? null;
      }, [consentNotRequired, consentResp, authResp?.data?.user?.role]); 
  
    /* ───────────────────── memoised context value ───────────────────────── */
    const ctxValue = useMemo<AuthCtx>(
      () => ({
        isAuthenticated,
        authStatusCode: isAuthenticated ? 200 : authStatusCode,
        user: authResp?.data?.user ?? null,
        consent: consentData,
      }),
      [isAuthenticated, authStatusCode, authResp, consentData],
    );
  
    /* ─────────────────────────── rendering logic ────────────────────────── */
    let rendered: ReactNode = children;
  
    if (authLoading || (isAuthenticated && consentStatus === 'pending')) {
      rendered = (
        <div className="h-screen w-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    } else if (isUnauthenticated && location.pathname !== '/login') {
      rendered = <Navigate to="/login" replace />;
    } else if (consentRequiredButMissing && location.pathname !== '/consent') {
      rendered = <Navigate to="/consent" replace />;
    } else {
      const fatalAuth =
        authError &&
        authStatusCode !== null &&
        ![401, 410].includes(authStatusCode);
  
      const fatalConsent =
        consentStatus === 'error' && consentStatusCode !== 403;
  
      if ((fatalAuth || fatalConsent) && location.pathname !== '/login') {
        rendered = (
          <div className="h-screen w-screen flex items-center justify-center">
            Something went wrong. Please try again later.
          </div>
        );
      }
    }
  
    /* ─────────────────────────────────────────────────────────────────────── */
    return (
      <AuthContext.Provider value={ctxValue}>{rendered}</AuthContext.Provider>
    );
  };
  