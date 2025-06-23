import axios, {AxiosResponse} from "axios";
import { useQuery } from "@tanstack/react-query";
import { generateUrl } from "@/urls";

interface Staff{
    id: number;
    full_name?: string;
    phone_number: string;
    email: string;
    metadata?: {
        position: string;
        department: string;
    }
}
interface StaffList{
    staffs: Staff[];
}

async function getStaffList(){
    try{
        const response: AxiosResponse<StaffList> = await axios.get(generateUrl('STAFF_LIST'));
        console.log(response.data);
        return response.data;
    }catch(error: any){
        throw new Error(`Error: ${error.response.data}`);
    }
}
export function useStaffList() {
    return useQuery({
        queryKey: ['staffList'],
        queryFn: getStaffList,
    });
};