import { useState } from "react";
import type { AlertMessage } from "../types/types";
import Alert from "./Alert"


const ProductVariants = () => {

    const [alert, setAlert] = useState<AlertMessage>({});

  return (
    <div className="fixed inset-0 bg-black  flex justify-center items-center z-50">
        <form  className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
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

        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
            Guardar Variante
        </button>

        
  </form>
    </div>
  )
}

export default ProductVariants