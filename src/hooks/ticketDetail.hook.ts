import axios, {AxiosResponse} from "axios";
import { useQuery } from "@tanstack/react-query";


interface TicketDetail {
    id: number;
    type: string;
    status: string;
    user_initiated: {
        full_name: string;
        phone_number: string;
    };
    nok_contact: string;
    user_address: string;
    created_at: string;
}

async function getTicketDetail(id: number) {
   try { 
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ticket-details/`, {
            params: {
                id: id
            }
        });
        return response.data;
    }catch(error){
        console.error('Error fetching ticket detail:', error);
        throw error;
    }
}

export function useTicketDetail(id: number) {
    return useQuery<TicketDetail, Error>({
        queryKey: ['ticketDetail', id],
        queryFn: () => getTicketDetail(id),
    });
}
