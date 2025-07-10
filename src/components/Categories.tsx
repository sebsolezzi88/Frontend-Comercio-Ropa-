import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import type { AlertMessage, Category, LoginApiResponse } from '../types/types';
import { addCategory, getCategories, type CategoryData } from '../api/categoty';
import Alert from './Alert';
import CategoryList from './CategoryList';
import type { AxiosError } from 'axios';

const Categories = () => {

  const [alert, setAlert] = useState<AlertMessage>({});
  const [categotyInput, setCategoryInput] = useState<CategoryData>({name:''});
  const [categories, setCategories] = useState<Category[]>([]); //arreglo para las categorias.

  const handletChange = (e:ChangeEvent<HTMLInputElement>) =>{
    setCategoryInput({...categotyInput,[e.target.name]: e.target.value})
  } 

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
  

  const handletSubmit = async (e:FormEvent) =>{
      e.preventDefault();
      try {
        if(categotyInput.name.trim() === ''){
          setAlert({color:'bg-red-500',message:'Complete el campo'});
          return;
        }

        //Guardamos la categoria
        const response = await addCategory(categotyInput);
         setCategoryInput({...categotyInput,name: ''}); //Limpiamos el input
         setCategories([...categories,response.category]); //actualizamos el estado de categoria
         setAlert({color:'bg-red-500',message:'Categoría creada'});
      } catch (error) {
        const err = error as AxiosError<LoginApiResponse>;
                
        if (err.response?.data?.message) {
            setAlert({color: "bg-red-500",message: err.response.data.message});
          } else {
            setAlert({color: "bg-red-500",message: "Error desconocido.",});
          } 
      } finally{
        setTimeout(() => {
          setAlert({});
        }, 2000);
      }
  }


  return (
      <div className="flex justify-center items-start px-4">
    <form onSubmit={handletSubmit}  className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
        
        {!alert.message ? (<h2 className="text-center text-white text-xl font-bold mb-4">
            Registrate una categoría
          </h2>) :<Alert alert={alert}/>  
          }
        
        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="username">Categoría</label>
        <input value={categotyInput.name} onChange={handletChange}   className="bg-white rounded w-full p-2 text-stone-950" type="text" name="name" id="categoryName" />
        </div>

        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
            Guardar
        </button>
        
  </form>
    <CategoryList categories={categories} setCategories={setCategories}/>
</div>
  )
}

export default Categories