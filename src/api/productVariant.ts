import axios from "axios";
import type { AddApiProductVariantResponse, GetApiProductVariantsResponse, ProductVariant } from "../types/types";


const URL:string = import.meta.env.VITE_API_URL;


export const addProductVariant= async (product:ProductVariant)=> {
    const token = localStorage.getItem("token");

    const res = await axios.post<AddApiProductVariantResponse>(`${URL}/variant`, product,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    return res.data;
}

export const getProductVariants= async (product:ProductVariant)=> {
   
    const res = await axios.post<GetApiProductVariantsResponse>(`${URL}/variant/product/${product.id}`);
    
    return res.data;
}