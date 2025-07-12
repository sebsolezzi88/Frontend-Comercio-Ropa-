import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { AlertMessage, ApiResponse, Product, ProductVariant } from "../types/types"
import Alert from "./Alert";
import { getProductVariants } from "../api/productVariant";
import type { AxiosError } from "axios";

interface ViewProductVariantsModalProps{
    productToViewVariants:Product | null;
    setIsViewVariantsModalOpen:Dispatch<SetStateAction<boolean>>;
    setProductToViewVariants:Dispatch<SetStateAction<Product | null>>;
}

const ViewProductVariantsModal = ({productToViewVariants,
    setIsViewVariantsModalOpen,setProductToViewVariants}:ViewProductVariantsModalProps) => {

    //alerta de errores
    const[ alert, setAlert] = useState<AlertMessage>({});
    const [productVariants , setProductVariants] = useState<ProductVariant[]>([]);

    //UseEffect para recuperar variantes
    useEffect(() => {
        const getVariants = async () =>{
            try {
                if(productToViewVariants){
                const response =  await getProductVariants(productToViewVariants)
                if(response.status ==='success'){
                    setProductVariants(response.variants);
                }
            }
            } catch (error) {
                const err = error as AxiosError<ApiResponse>;
                console.log(error);
                if (err.response?.data?.message) {
                    setAlert({color: "bg-red-500",message: err.response.data.message});
                } else {
                    setAlert({color: "bg-red-500",message: "Error desconocido.",});
                } 
            }
        }
        getVariants();
    }, [])
    

  return (
    <div className="fixed inset-0 bg-gray-600 flex flex-col justify-center items-center z-50 p-4">
        <div className="flex justify-center gap-2 items-center mb-4 w-full">
            <h3 className="text-white text-2xl font-bold">
                Variantes del Producto: {productToViewVariants?.name}
            </h3>
            <button
                type="button"
                onClick={() => setIsViewVariantsModalOpen(false)} // <-- si estás usando ese state
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
            >
                Cerrar
            </button>
        </div>

  {/* Tabla de variantes */}
    <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
        {/* Tabla */}
        <table className="table-auto w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-gray-700 text-white rounded overflow-hidden shadow-md">
            <thead className="bg-green-600">
            <tr>
                <th className="p-3 text-left">Talle</th>
                <th className="p-3 text-left">Cantidad</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Acción</th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-b border-gray-500">
                <td className="p-3">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className="p-3">Malcolm Lockyer</td>
                <td className="p-3">1961</td>
                <td className="p-3">
                <div className="flex gap-2">
                    <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                    Editar
                    </button>
                    <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                    Eliminar
                    </button>
                </div>
                </td>
            </tr>
            </tbody>
        </table>

        {/* Formulario */}
        <form className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">
            {alert.message ? (
            <Alert alert={alert} />
            ) : (
            <h2 className="text-center text-white text-xl font-bold mb-4">
                Edita la variante del producto
            </h2>
            )}

            <div className="mt-2">
            <label className="block text-green-500 font-bold uppercase" htmlFor="size">
                Talle
            </label>
            <input
                className="bg-white rounded w-full p-2 text-stone-950"
                type="text"
                name="size"
                id="size"
            />
            </div>

            <div className="mt-2">
            <label className="block text-green-500 font-bold uppercase" htmlFor="stock">
                Stock
            </label>
            <input
                className="bg-white rounded w-full p-2 text-stone-950"
                type="number"
                min={0}
                name="stock"
                id="stock"
            />
            </div>

            <div className="mt-2">
            <label className="block text-green-500 font-bold uppercase" htmlFor="price">
                Precio
            </label>
            <input
                className="bg-white rounded w-full p-2 text-stone-950"
                type="number"
                min={0}
                name="price"
                id="price"
            />
            </div>

            <button
            type="button"
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
            Cancelar
            </button>
            <button
            type="submit"
            className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
            Editar Variante
            </button>
        </form>
        </div>
        
    </div>
  )
}

export default ViewProductVariantsModal