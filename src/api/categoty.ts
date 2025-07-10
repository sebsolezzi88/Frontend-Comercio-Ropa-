import axios from "axios";

const URL:string = import.meta.env.VITE_API_URL;

export interface CategoryData{
    name: string;
}

export const addCategory= async (data:CategoryData)=> {
    const res = await axios.post<RegisterApiResponse>(`${URL}/category`, data);
    return res.data;
}