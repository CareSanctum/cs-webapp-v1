
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Residents from "./pages/Residents";
import Society from "./pages/Society";
import EmergencyDetail from "./pages/EmergencyDetail";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./AuthContext";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import axios from "axios";
import Staff from "./pages/Staff";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/emergency/:id" element={<EmergencyDetail />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/society" element={<Society />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/staff" element={<Staff />} />
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
