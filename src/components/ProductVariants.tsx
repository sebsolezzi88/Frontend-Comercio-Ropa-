import { useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import type { AlertMessage, ApiResponse, Product, ProductVariant } from "../types/types";
import Alert from "./Alert"
import type { AxiosError } from "axios";
import { addProductVariant } from "../api/productVariant";

interface ProductVariantProps {
  alert:AlertMessage;
  productAddVariant: Product | null;
  setIsVariantModalOpen:Dispatch<SetStateAction<boolean>>;
  setAlert: Dispatch<SetStateAction<AlertMessage>>;
  setProductAddVariant: Dispatch<SetStateAction<Product | null>>;
}


const ProductVariants = ({alert,productAddVariant,setIsVariantModalOpen, setAlert,setProductAddVariant}:ProductVariantProps) => {

  const [alertProVari, setAlertProVari] = useState<AlertMessage>({});

  const [productVariant, setProductVariant] = useState<ProductVariant>({
    productId:0,
    size:'',
    stock:0,
    price:0
  });

  //cerrar modal
  const handletCloseMoldal = () =>{
    setProductAddVariant(null);
    setIsVariantModalOpen(false);
  }

  //handletChange de los imputs
  const handletChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setProductVariant({...productVariant, [e.target.name]:e.target.value})
  }

  //submit del form
  const handletSubmit =  async(e:FormEvent) =>{
    try {
      e.preventDefault();

      //Verificar campos
      if(productVariant.price < 0 || productVariant.stock < 0){
        setAlertProVari({color: "bg-red-500",message: "Precio y Stock no pueden ser negativos"});
        return;
      }

      if(productVariant.size.trim() === ''){
        setAlertProVari({color: "bg-red-500",message: "Debe ingresar Talle"});
        return;
      }
      if(!productAddVariant?.id){
        setAlertProVari({color: "bg-red-500",message: `No se logró obtene Id de Prodcucto ${productAddVariant?.name}`});
        return;
      }

      const variantToSend = {
        ...productVariant,
        productId: productAddVariant.id
      };

      const response = await addProductVariant(variantToSend);
      if(response.status==='success'){
        setAlertProVari({color: "bg-green-500",message: "Variante agregada"});
        setProductVariant({
            productId:0,
            size:'',
            stock:0,
            price:0
          });
        setTimeout(() => {
          setAlertProVari({});
          setProductAddVariant(null);
          setIsVariantModalOpen(false);
          
        }, 1000);
      }

    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      console.log(error)
      if (err.response?.data?.message) {
        setAlertProVari({color: "bg-red-500",message: err.response.data.message});
      } else {
        setAlertProVari({color: "bg-red-500",message: "Error desconocido.",});
      } 
    }finally{
      setTimeout(() => {
        setAlertProVari({});
      }, 2000);
    }
    
  }


  return (
    <div className="fixed inset-0 bg-black  flex justify-center items-center z-50">
        <form onSubmit={handletSubmit}  className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
        {alertProVari.message ?  <Alert alert={alertProVari} /> : 
        <h2 className="text-center text-white text-xl font-bold mb-4">
          Agrega nuevos variantes de producto
        </h2>}
        
        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="username">Talle</label>
        <input onChange={handletChange} value={productVariant.size}  className="bg-white rounded w-full p-2 text-stone-950" type="text" name="size" id='size' />
        </div>

        <div className="mt-2">
          <label className="block text-green-500 font-bold uppercase" htmlFor="text">Stock</label>
            <input onChange={handletChange}  value={productVariant.stock} className="bg-white rounded w-full p-2 text-stone-950" type="number" min={0} name="stock" />
        </div>

        <div className="mt-2">
          <label className="block text-green-500 font-bold uppercase" htmlFor="text">Precio</label>
            <input onChange={handletChange}  value={productVariant.price} className="bg-white rounded w-full p-2 text-stone-950" type="number" min={0} name="price" />
        </div>
        <button type="button" onClick={handletCloseMoldal} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full">
            Cancelar
        </button>
        <button type="submit" className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
            Guardar Variante
        </button>

        
  </form>
    </div>
  )
}

export default ProductVariants