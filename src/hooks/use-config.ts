import axios, {AxiosResponse}from "axios";
import {useQuery} from "@tanstack/react-query";
import { generateUrl } from "@/urls";

async function getConfig() {
    try{
        
        const response = await axios.get(generateUrl('CONFIG'));
        return response.data;
    }catch(error: any){
        throw new Error(`Error: ${error.response}`)
    }
}

export function useConfig() {
    return useQuery({
        queryKey: ['config'],
        queryFn: getConfig,
    });
}

