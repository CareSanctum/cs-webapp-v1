import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const ProfileDataRequest = async (username: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user-details/${username}/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error: ${error.response}`)
    }
}

export function useUserProfile(username: string) {
    return useQuery({
        queryKey: ['userProfile', username],
        queryFn: () => ProfileDataRequest(username),
        staleTime: Infinity
    });
}