import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import type { AlertMessage, Product } from "../types/types";
import Alert from "./Alert"

interface ProductVariantProps {
  alert:AlertMessage;
  productAddVariant: Product | null;
  setIsModalOpen:Dispatch<SetStateAction<boolean>>;
  setAlert: Dispatch<SetStateAction<AlertMessage>>;
  setProductAddVariant: Dispatch<SetStateAction<Product | null>>;
}


const ProductVariants = ({alert,productAddVariant,setIsModalOpen, setAlert,setProductAddVariant}:ProductVariantProps) => {

  const [alertProVari, setAlertProVari] = useState<AlertMessage>({});

  //cerrar modal
  const handletCloseMoldal = () =>{
    setProductAddVariant(null);
    setIsModalOpen(false);
  }

  //submit del form
  const handletSubmit =  async(e:FormEvent) =>{
    e.preventDefault();
  }


  return (
    <div className="fixed inset-0 bg-black  flex justify-center items-center z-50">
        <form onSubmit={handletSubmit}  className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
        {alert.message ?  <Alert alert={alert} /> : 
        <h2 className="text-center text-white text-xl font-bold mb-4">
          Agrega nuevos productos
        </h2>}
        
        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="username">Talle</label>
        <input  value={''}  className="bg-white rounded w-full p-2 text-stone-950" type="text" name="size" id='size' />
        </div>

        <div className="mt-2">
          <label className="block text-green-500 font-bold uppercase" htmlFor="text">Stock</label>
            <input  value={''} className="bg-white rounded w-full p-2 text-stone-950" type="number" name="stock" />
        </div>

        <div className="mt-2">
          <label className="block text-green-500 font-bold uppercase" htmlFor="text">Precio</label>
            <input  value={''} className="bg-white rounded w-full p-2 text-stone-950" type="number" name="price" />
        </div>
        <button onClick={handletCloseMoldal} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full">
            Cancelar
        </button>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
            Guardar Variante
        </button>

        
  </form>
    </div>
  )
}

export default ProductVariants