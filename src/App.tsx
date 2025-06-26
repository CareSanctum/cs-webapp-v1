import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Residents from "./pages/Residents";
import Society from "./pages/Society";
import Staff from "./pages/Staff";
import Profile from "./pages/Profile";
import EmergencyDetail from "./pages/EmergencyDetail";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuthContext } from "./AuthContext";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import axios from "axios";
import Onboarding from "./pages/Onboarding";
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

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, statusCode } = useAuthContext();
  const location = useLocation();
  if (isAuthenticated) return children;
  // If not authenticated, redirect to login
  if (statusCode === 401 || statusCode === 410) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Optionally, show nothing or a loading indicator while checking
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/emergency/:id" element={<ProtectedRoute><EmergencyDetail /></ProtectedRoute>} />
          <Route path="/residents" element={<ProtectedRoute><Residents /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
          <Route path="/society" element={<ProtectedRoute><Society /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
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
