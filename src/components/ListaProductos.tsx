import React, { useEffect, useState } from 'react'
import type { AlertMessage, Category, LoginApiResponse, Product } from '../types/types';
import { getCategories } from '../api/categoty';
import { getProducts } from '../api/products';
import type { AxiosError } from 'axios';

const ListaProductos = () => {

    const [alert, setAlert] = useState<AlertMessage>({});
    const [categories, setCategories] = useState<Category[]>([]); //arreglo para las categorias.
    const [products, setProducts] = useState<Product[]>([]); //arreglo para las categorias.
    const [selectedCategory, setSelectedCategory] = useState(''); //variable para filtrar categorias

    useEffect(() => {
        const getFromApi = async () =>{
          
          try {
    
            const responseCat =  await getCategories();
            const responsePro = await getProducts();
            if(responseCat.status === 'success' && responsePro.status === 'success'){
              setCategories(responseCat.categories);
              setProducts(responsePro.products);

            }
    
          } catch (error) {
            const err = error as AxiosError<LoginApiResponse>;
            console.log(error);
            if (err.response?.data?.message) {
                setAlert({color: "bg-red-500",message: err.response.data.message});
            } else {
                setAlert({color: "bg-red-500",message: "Error desconocido.",});
            } 
          }
        }
        getFromApi();
      }, [])

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.categoryId === parseInt(selectedCategory))
        : products;
  return (
    <>
       <h2 className='text-2xl'>Productos</h2>
       <div className="flex items-center gap-2 my-4">
            <h3 className="text-lg font-semibold">Filtrar por</h3>
            <select 
                className="font-bold uppercase px-2 py-1 rounded" 
                name="categoryId" 
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="">Todas</option>
            {categories.map(category =>(
                <option 
                    className="bg-white text-stone-950 font-bold uppercase" 
                    key={category.id} 
                    value={category.id}>
                    {category.name}
              </option>
          ))}
            </select>
        </div>
       
        <div className="flex gap-3 mt-4">

          {filteredProducts.map( product => (
            <div className='bg-gray-500 w-50 p-2 '>
                <img src={product.urlImage} alt={product.name} />
                <h4 className='text-xl'>{product.name}</h4>
                <p>{product.description}</p>
                <p>categoria:{product.categoryId}</p>
                <div className='flex gap-2'>
                    <button className='mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded'>Editar</button>
                    <button className='mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'>Eliminar</button>
                </div>
            </div>
        ))}
        

    </div>
    </>
     
  )
}

export default ListaProductos