import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { getCSRFToken } from "@/utils";

async function uploadFile(formData: FormData) {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload-file/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCSRFToken()
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

export const useUploadFile = () => {
    return useMutation({
        mutationFn: uploadFile,
    });
};