import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import type { AlertMessage, ApiResponse, Product, ProductVariant } from "../types/types"
import Alert from "./Alert";
import { getProductVariants, updateProductVariant } from "../api/productVariant";
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
    const [viewFormEdit, setViewFormEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productVariants , setProductVariants] = useState<ProductVariant[]>([]);
    const [variantToEdit , setVariantToEdit] = useState<ProductVariant>({
    productId:0,
    size:'',
    stock:0,
    price:0
  });


    //UseEffect para recuperar variantes
    useEffect(() => {
        const getVariants = async () =>{
            try {
                if(productToViewVariants){
                const response =  await getProductVariants(productToViewVariants)
                if (response.status === 'success' && Array.isArray(response.variants)) {
                    setProductVariants(response.variants);
                } else {
                    setProductVariants([]); 
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
            }finally{
                setLoading(false);
            }
        }
        getVariants();
    }, [])

    const handleEditVariant = (variant:ProductVariant) =>{
        setVariantToEdit(variant);
        setViewFormEdit(true);
    }
    const handletChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;

        setVariantToEdit((prev) => ({
            ...prev,
            [name]: name === "stock" || name === "price" ? Number(value) : value
        }));
    }

    //Submit editar
    const handletSubmit = async (e:FormEvent)=>{
        e.preventDefault();
        //Verificar campos
      if(variantToEdit.price < 0 || variantToEdit.stock < 0){
        setAlert({color: "bg-red-500",message: "Precio y Stock no pueden ser negativos"});
        return;
      }

      if(variantToEdit.size.trim() === ''){
        setAlert({color: "bg-red-500",message: "Debe ingresar Talle"});
        return;
      }
      if(!variantToEdit?.id){
        setAlert({color: "bg-red-500",message: `No se logró obtene Id de la variante de ${productToViewVariants?.name}`});
        return;
      }

      try {
        
        const response = await updateProductVariant(variantToEdit);
        if(response.status==='success'){
            setProductVariants( productVariants.map(variant =>variant.id === variantToEdit.id ? response.productVariant : variant));
            setAlert({color: "bg-green-500",message: "Variante Actualizada.",});
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
      finally{
        setTimeout(() => {
            setAlert({});
            setViewFormEdit(false);
        }, 2000);
      }
    }
    const handleDeleteVariant = (variantId:number|undefined) =>{

    }
    
  if(loading) return <h3 className="text-white text-2xl font-bold">Loading...</h3>

  return (
    <div className="fixed inset-0 bg-gray-600 flex flex-col justify-center items-center z-50 p-4">
        <div className="flex justify-center gap-2 items-center mb-4 w-full">
            <h3 className="text-white text-2xl font-bold">
                Variantes del Producto: {productToViewVariants?.name}
            </h3>
            <button
                type="button"
                onClick={() => setIsViewVariantsModalOpen(false)} 
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
            >
                Cerrar
            </button>
        </div>

  {/* Tabla de variantes */}
    <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
        {/* Tabla */}
      
        {Array.isArray(productVariants) && productVariants.length === 0 ? (
            <p className="text-white text-center mt-4">No hay variantes</p>
            ) : (
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
                {productVariants.map((variant) => (
                    <tr key={variant.id} className="border-b border-gray-500">
                    <td className="p-3">{variant.size}</td>
                    <td className="p-3">{variant.stock}</td>
                    <td className="p-3">{variant.price}</td>
                    <td className="p-3">
                        <div className="flex gap-2">
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={() => handleEditVariant(variant)} 
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            onClick={() => handleDeleteVariant(variant?.id)} 
                        >
                            Eliminar
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        

        {/* Formulario */}
        {viewFormEdit &&
        <form onSubmit={handletSubmit} className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">
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
                value={variantToEdit?.size}
                onChange={handletChange}
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
                value={variantToEdit?.stock}
                onChange={handletChange}
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
                value={variantToEdit?.price}
                onChange={handletChange}
            />
            </div>

            <button
            type="button"
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
                onClick={()=> setViewFormEdit(false)}
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
        }
        </div>
        
    </div>
  )
}

export default ViewProductVariantsModal