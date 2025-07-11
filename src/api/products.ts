import axios from "axios";
import type { ApiResponse, GetApiProductsResponse, Product, ProductData, UpdateApiProductResponse } from "../types/types";

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

export const updateProduct= async (product:Product)=> {
    const token = localStorage.getItem("token");

    const res = await axios.put<UpdateApiProductResponse>(`${URL}/product/${product.id}`, product,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    return res.data;
}

export const deleteProduct= async (product:Product)=> {
    const token = localStorage.getItem("token");

    const res = await axios.delete<ApiResponse>(`${URL}/product/${product.id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    return res.data;
}

export const getProducts= async ()=> {

    const res = await axios.get<GetApiProductsResponse>(`${URL}/product`);
    
    return res.data;
}