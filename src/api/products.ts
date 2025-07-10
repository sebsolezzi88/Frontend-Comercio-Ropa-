import axios from "axios";
import type { ApiResponse, Product } from "../types/types";

const URL:string = import.meta.env.VITE_API_URL;


export const addProdcut= async (product:Product)=> {
    const token = localStorage.getItem("token");

    const res = await axios.post<ApiResponse>(`${URL}/product`, product,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    return res.data;
}