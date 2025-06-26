import axios from "axios";
import { generateUrl } from "@/urls";
import { useMutation } from "@tanstack/react-query";
import { getCSRFToken } from "@/utils";

async function login({username, password}: {username: string, password: string}) {
    try {
        const csrfToken = getCSRFToken();
        const response = await axios.post(generateUrl('LOGIN'), {
            username,
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