import { useQuery } from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";

interface TicketAudit {
    id: number;
    description: string;
    created_at: string;
}
interface TicketHistory {
    history: TicketAudit[];
}

async function getTicketHistory(ticketId: number): Promise<TicketHistory> {
    try{
        const response: AxiosResponse<TicketHistory> = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ticket-history/`, {
            params: {
                id: ticketId
            }
        });
        console.log(response.data);
        return response.data;
        
    }
    catch(error){
        console.error("Error fetching ticket history:", error);
        throw error;
    }
}

export function useTicketHistory(ticketId: number) {
    return useQuery({
        queryKey: ["ticketHistory", ticketId],
        queryFn: () => getTicketHistory(ticketId),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })
}