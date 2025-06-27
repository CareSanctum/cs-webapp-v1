import axios, {AxiosResponse} from "axios";
import { generateUrl } from "@/urls";
import { getCSRFToken } from "@/utils";
import { useQuery } from "@tanstack/react-query";

interface TicketListParams {
    status?: string;
    type?: string;
    date_from: string;
    date_to: string;
}

export interface Ticket {
    id: number;
    user_initiated: {
        id: number;
        phone_number: string;
        full_name: string;
    };
    type: {
        code: string;
        name: string;
    };
    status: string
    created_at: string;
    closed_at?: string;
    nok_contact?: string;
    address?: string;
}
interface TicketListResponse {
    tickets: Ticket[];
}

async function getTicketList(params: TicketListParams): Promise<TicketListResponse> {
    try{const response: AxiosResponse<TicketListResponse> = await axios.get(generateUrl('TICKET_LIST'), {
        params: {
            ...params
        }
    });
    return response.data;
    }catch(error: any){
        throw new Error(`Error: ${error.response}`)
    }
}

export function useTicketList(params: TicketListParams) {
    return useQuery({
        queryKey: ['ticketList', params],
        queryFn: () => getTicketList(params),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
}