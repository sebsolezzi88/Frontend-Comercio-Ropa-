import axios from "axios";
import type { RegisterApiResponse } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export interface RegisterData{
    username: string;
    password:string;
    passwordr:string;
    email:string;
    passwordAuth:string; 
}

export const registerUser = async (data:RegisterData):Promise<RegisterApiResponse> => {
  try {
    const res = await axios.post<RegisterApiResponse>(`${URL}/admin/register`, data);
    return res.data;
  } catch (error) {
    return { status: 'error', message: 'Error de conexión o del servidor' };
  }
};