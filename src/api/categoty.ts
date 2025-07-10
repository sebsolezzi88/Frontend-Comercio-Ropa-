import axios from "axios";
import type { GetApiCategoriesResponse, RegisterApiCategoryResponse } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;

export interface CategoryData{
    name: string;
}

export const addCategory= async (data:CategoryData)=> {
    const token = localStorage.getItem("token");
    const res = await axios.post<RegisterApiCategoryResponse>(`${URL}/category`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return res.data;
}

export const getCategories= async ()=> {

    const res = await axios.get<GetApiCategoriesResponse>(`${URL}/category`);
    return res.data;
}

export const deleteCategory = async (categoryId:number) =>{
  const res = await axios.delete(`${URL}/category/${categoryId}`);
  return res.data;
}