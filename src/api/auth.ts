import axios from "axios";
import type { LoginApiResponse, RegisterApiResponse } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export interface RegisterData{
    username: string;
    password:string;
    passwordr:string;
    email:string;
    passwordAuth:string; 
}

export type LoginData = Pick<RegisterData, "username" | "password">;

export const registerUser = async (data:RegisterData)=> {
    const res = await axios.post<RegisterApiResponse>(`${URL}/admin/register`, data);
    return res.data;
}

export const loginUser = async (data:LoginData)=> {
    const res = await axios.post<LoginApiResponse>(`${URL}/admin/login`, data);
    return res.data;
}
