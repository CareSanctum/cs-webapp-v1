import axios, { AxiosResponse } from "axios";
import { generateUrl } from "@/urls";
import { useQuery } from "@tanstack/react-query";

interface Resident{
    id: number;
    full_name?: string;
    phone_number?: string;
    email?: string;
    address?: string;
    profile_picture_url?: string;
    nok_contact_number?: string;
    
}

interface ResidentList{
    residents: Resident[];
}

async function getResidentList(){
    try{
        const response: AxiosResponse<ResidentList> = await axios.get(generateUrl('RESIDENT_LIST'));
        return response.data;
    }catch(error: any){
        throw new Error(`Error: ${error.response.data}`);
    }
}

export function useResidentList(){
    return useQuery({
        queryKey: ['residentList'],
        queryFn: getResidentList,
    })  
}