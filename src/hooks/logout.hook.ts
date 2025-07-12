import { useAuthStore } from "@/store/AuthStore";
import { generateUrl } from "@/urls";
import { getCSRFToken } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

async function logout() {
    try {
        const csrfToken = getCSRFToken();
        const response = await axios.delete(generateUrl('AUTH'),  {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
        return response.data;
    }catch(error: any){
        // Treat 401 as successful logout (user is already logged out)
        if (error.response?.status === 401 || error.response?.status === 410) {
            return error.response.data;
        }
        // Throw error for all other cases (server errors, network errors, etc.)
        throw new Error(`Error: ${error.response?.data?.message || error.message || 'Unknown error occurred'}`);
    }
}

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const clearusername = useAuthStore(state => state.clearusername)
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // Clear all auth-related queries from cache
            queryClient.removeQueries({ queryKey: ['authStatus'] });
            queryClient.removeQueries({ queryKey: ['consent-status'] });
            
            // Clear username from store
            clearusername();
            
            // Navigate to login
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            console.error(error);
        },
    });
}