import axios from "axios";
import { generateUrl } from "@/urls";
import { useMutation } from "@tanstack/react-query";
import { getCSRFToken } from "@/utils";

async function login({email, password}: {email: string, password: string}) {
    try {
        const csrfToken = getCSRFToken();
        const response = await axios.post(generateUrl('LOGIN'), {
            email,
            password,
        }, {
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });
        return response.data;
    }catch(error: any){
        throw new Error(`Error: ${error.response}`)
    }
}

export function useLogin() {
    return useMutation({
        mutationFn: login,
    });
}