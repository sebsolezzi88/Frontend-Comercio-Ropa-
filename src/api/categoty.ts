import axios from "axios";
import type { RegisterApiCategoryResponse } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export interface CategoryData{
    name: string;
}

export const addCategory= async (data:CategoryData)=> {
    const res = await axios.post<RegisterApiCategoryResponse>(`${URL}/category`, data);
    return res.data;
}