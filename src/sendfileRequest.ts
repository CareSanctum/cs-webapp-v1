import axios from "axios";
import { getCSRFToken } from "./utils";

export const sendfileRequest = async (formData: FormData) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload-file/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': getCSRFToken()
          },
        });
        console.log('File uploaded successfully:', response.data);
        return response;
      }
      catch(error){
        console.error('Error uploading file:', error);
        throw error;
      }
}