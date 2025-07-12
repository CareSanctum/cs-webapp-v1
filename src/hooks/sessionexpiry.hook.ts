import axios from "axios";
import { generateUrl } from "../urls";
import { useQuery } from "@tanstack/react-query";

export async function checkSessionExpiry() {
    try{
        const response = await axios.get(generateUrl('SESSION_EXPIRY'));
        return response.data;
    }catch(error: any){
        throw new Error(`Error: ${error.response.data}`);
    }
}

export const useSessionExpiry = () => {
    return useQuery({
        queryKey: ['sessionExpiry'],
        queryFn: checkSessionExpiry,
        retry: false,
        staleTime: Infinity,
    });
}

