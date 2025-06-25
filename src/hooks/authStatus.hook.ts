import axios from "@/axios";
import { generateUrl } from "@/urls";
import { useQuery } from "@tanstack/react-query";

async function getAuthStatus() {
    try {
        const response = await axios.get(generateUrl('AUTH'));
        return response.data;
    } catch (error: any) {
        // Pass through the error for status code handling
        throw error;
    }
}

export function useAuthStatus() {
    return useQuery({
        queryKey: ['authStatus'],
        queryFn: getAuthStatus,
        retry: false,
    });
}