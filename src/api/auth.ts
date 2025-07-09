import axios from "axios";

const URL:string = import.meta.env.VITE_API_URL;

export interface RegisterData{
    username: string;
    password:string;
    passwordr:string;
    email:string;
    passwordAuth:string; 
}

export const register = async (data:RegisterData) => {
  const res = await axios.post(`${URL}/admin/register`, data);
  return res.data;
};