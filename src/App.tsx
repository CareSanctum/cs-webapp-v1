import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { Loader2 } from "lucide-react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Residents from "./pages/Residents";
import Society from "./pages/Society";
import Staff from "./pages/Staff";
import Profile from "./pages/Profile";
import EmergencyDetail from "./pages/EmergencyDetail";
import ConsentPage from "./pages/ConsentPage";
import ConsentList from "./pages/ConsentList";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuthContext } from "./AuthContext";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import axios from "axios";
import Onboarding from "./pages/Onboarding";
import { useEffect } from "react";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function PrivateRoute({
  children,
  allowConsentPage = false,
}: {
  children: JSX.Element;
  allowConsentPage?: boolean;
}) {
  const { isAuthenticated, authStatusCode, consent } = useAuthContext();
  const location = useLocation();

  /* ---------------------------------------------------------------------- */
  /* Pop-state guard: stop an authenticated user from ‘back’-navigating     */
  /* to /login.  (unchanged)                                                */
  /* ---------------------------------------------------------------------- */
  useEffect(() => {
    if (!isAuthenticated) return;
    const blockLoginBack = (e: PopStateEvent) => {
      if (e.state && e.state.pathname === '/login') {
        window.history.pushState(null, '', location.pathname);
      }
    };
    window.addEventListener('popstate', blockLoginBack);
    return () => window.removeEventListener('popstate', blockLoginBack);
  }, [isAuthenticated, location.pathname]);

  /* ---------------------------------------------------------------------- */
  /* 1. Unauthenticated paths                                               */
  /* ---------------------------------------------------------------------- */
  if (!isAuthenticated) {
    if (authStatusCode === 401 || authStatusCode === 410) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* 2. Special handling for /consent                                       */
  /* ---------------------------------------------------------------------- */
  const role = consent?.role;
  if (allowConsentPage) {
    if (role === 'USERS') {
      /* USERS can always (re)open the consent page */
      return children;
    }
    /* Staff/Admin never need the consent screen */
    return <Navigate to="/" replace />;
  }

  /* ---------------------------------------------------------------------- */
  /* 3. Normal private pages                                                */
  /* ---------------------------------------------------------------------- */
  const needsConsent = role === 'USERS';
  const hasConsent =
    consent?.consent !== null 

  if (needsConsent && !hasConsent) {
    /* must complete consent before visiting other pages */
    return <Navigate to="/consent" state={{ from: location }} replace />;
  }

  /* everything OK → render the target page */
  return children;
}


/* -------------------------------------------------------------------------- */
/*  Login guard: lets logged-in users bounce away from /login automatically   */
/* -------------------------------------------------------------------------- */
function LoginRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, authStatusCode, consent } = useAuthContext();

  if (isAuthenticated) {
    const role = consent?.role;
    const needsConsent = role === 'USERS';
    const hasConsent =
      consent?.consent !== null

    if (needsConsent && !hasConsent) return <Navigate to="/consent" replace />;
    return <Navigate to="/" replace />;
  }

  if (authStatusCode === 401 || authStatusCode === 410) return children;

  /* still verifying → spinner */
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
          <Route path="/emergency/:id" element={<PrivateRoute><EmergencyDetail /></PrivateRoute>} />
          <Route path="/consent" element={<PrivateRoute allowConsentPage><ConsentPage /></PrivateRoute>} />
          <Route path="/residents" element={<PrivateRoute><Residents /></PrivateRoute>} />
          <Route path="/staff" element={<PrivateRoute><Staff /></PrivateRoute>} />
          <Route path="/society" element={<PrivateRoute><Society /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
          <Route path="/consent-list" element={<PrivateRoute><ConsentList /></PrivateRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
