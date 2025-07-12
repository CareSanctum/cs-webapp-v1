import axios, {AxiosResponse} from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import { getCSRFToken } from "@/utils";
import { generateUrl } from "@/urls";

export interface ConsentStatus{
    consent: string | null;
    role: string;
}

export interface ConsentListItem{
    id: number;
    full_name: string | null;
    phone_number: string | null;
    consentType: string | null;
    updatedAt: string | null;
}
async function getConsentStatus(): Promise<ConsentStatus>{
    try{
        const response: AxiosResponse<ConsentStatus> = await axios.get(generateUrl('CONSENT_STATUS'));
        console.log('consent status', response.data);
        return response.data;
    }catch(error: any){
        // Re-throw the original error to preserve status codes
        throw error;
    }
}

async function updateConsent({consent, updated_at}: {consent: string, updated_at: string}){
    try{
        const csrfToken = getCSRFToken();
        const response = await axios.post(generateUrl('CONSENT_UPDATE'), {
            consent: consent,
            updated_at: updated_at
        }, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
        return response.data;
        
    }catch(error: any){
        // Re-throw the original error to preserve status codes
        throw error;
    }
}

async function getConsentList(): Promise<ConsentListItem[]>{
    try{
        const response = await axios.get(generateUrl('CONSENT_LIST'));
        const data: ConsentListItem[] = response.data.map((item: any) => ({
            id: item.id,
            full_name: item.full_name,
            phone_number: item.phone_number,
            consentType: item.type_specific_metadata?.consent,
            updatedAt: item.type_specific_metadata?.updated_at,
        }));
        console.log('consent list', data);
        return data;
    }catch(error: any){
        // Re-throw the original error to preserve status codes
        throw error;
    }
}

export function useConsentStatus(enabled: boolean = true){
    return useQuery({
        queryKey: ['consent-status'],
        queryFn: getConsentStatus,
        enabled: enabled,
    });
}

export function useConsentUpdate(){
    return useMutation({
        mutationFn: updateConsent,
    });
}

export function useConsentList(){
    return useQuery({
        queryKey: ['consent-list'],
        queryFn: getConsentList,
    });
}