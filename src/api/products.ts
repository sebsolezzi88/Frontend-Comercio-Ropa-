import axios from "axios";
import type { ApiResponse, ProductData } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;


export const addProduct= async (product:ProductData)=> {
    const token = localStorage.getItem("token");

    const res = await axios.post<ApiResponse>(`${URL}/product`, product,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    return res.data;
}

export const getProducts= async ()=> {

    const res = await axios.post<ApiResponse>(`${URL}/product`);
    
    return res.data;
}