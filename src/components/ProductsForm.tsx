import { useEffect, useState } from 'react'
import Alert from './Alert'
import type { AlertMessage, Category } from '../types/types';
import { getCategories } from '../api/categoty';

const ProductsForm = () => {

    //Stado de mensaje de alerta
    const [alert, setAlert] = useState<AlertMessage>({color:'',message:''});
    const [categories, setCategories] = useState<Category[]>([]); //arreglo para las categorias.

    //Use Effect para obtener las categorias
      useEffect(() => {
        const getCatecoriesFromApi = async () =>{
          
          try {
    
            const response =  await getCategories();
            if(response.status === 'success'){
              setCategories(response.categories);
            }
    
          } catch (error) {
            console.log(error);
          }
        }
        getCatecoriesFromApi();
      }, [])

  return (
    <div className="flex justify-center items-start min-h-screen px-4">
    <form className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
        {alert.message ?  <Alert alert={alert} /> : null}
        <h2 className="text-center text-white text-xl font-bold mb-4">
          Agrega nuevos productos
        </h2>
        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="username">Nombre</label>
        <input  className="bg-white rounded w-full p-2 text-stone-950" type="text" name="name" id='productname' />
        </div>

        <div className="mt-2">
          <label className="block text-green-500 font-bold uppercase" htmlFor="email">Descripción</label>
            <input   className="bg-white rounded w-full p-2 text-stone-950" type="email" name="description" />
        </div>

        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="password">Url Imagen</label>
        <input  className="bg-white rounded w-full p-2 text-stone-950" type="password" name="urlImage" />
        <small className="text-white block mt-1">Puede subir imagenes a <a className='text-green-500' href="https://imgur.com/" target='_blank'>imgur.com</a> </small>
        </div>

        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="security-password">Categoría</label>
        <input  className="bg-white rounded w-full p-2 text-stone-950" type="password" name="categoryId" />
        </div>

        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
            Guardar Producto
        </button>
        
  </form>
</div>
  )
}

export default ProductsForm