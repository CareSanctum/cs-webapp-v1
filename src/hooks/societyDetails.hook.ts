import axios, {AxiosResponse} from "axios";
import { useQuery } from "@tanstack/react-query";
import { generateUrl } from "../urls";

interface EmergencySectionData{
    name: string;
    phone: string;
}
interface ManagementSectionData{
    name: string;
    role: string;
    phone: string;
}
interface SocietyDetails{
    name: string;
    sections: {
        emergency_section: EmergencySectionData[];
        management_section: ManagementSectionData[];
    }
}

async function getSocietyDetails(){
    try{
        const response: AxiosResponse<SocietyDetails> = await axios.get(generateUrl('SOCIETY_DETAILS'));
        return response.data;
    }catch(error: any){
        throw new Error(`Error: ${error.response.data}`);
    }
}

export const useSocietyDetails = () => {
    return useQuery({
        queryKey: ['societyDetails'],
        queryFn: getSocietyDetails,
    });
};