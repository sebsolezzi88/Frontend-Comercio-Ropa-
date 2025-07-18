import axios from "axios";
import type { AddApiProductVariantResponse, GetApiProductVariantsResponse, Product, ProductVariant } from "../types/types";


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

export const updateProductVariant= async (product:ProductVariant)=> {
    const token = localStorage.getItem("token");

    const res = await axios.put<AddApiProductVariantResponse>(`${URL}/variant`, product,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    return res.data;
}

export const deleteProductVariant= async (variantId: number)=> {
    const token = localStorage.getItem("token");

    const res = await axios.delete<AddApiProductVariantResponse>(`${URL}/variant/${variantId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    return res.data;
}

export const getProductVariants= async (product:Product)=> {
   
    const res = await axios.get<GetApiProductVariantsResponse>(`${URL}/variant/product/${product.id}`);
    
    return res.data;
}