import type { AlertMessage, Category, LoginApiResponse } from '../types/types'
import  { deleteCategory } from '../api/categoty';
import { useState } from 'react';
import type { AxiosError } from 'axios';
import Alert from './Alert';

interface CategoryListProps{
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}


const CategoryList = ({categories, setCategories}: CategoryListProps) => {

  //Stado de mensaje de alerta
  const [alert, setAlert] = useState<AlertMessage>({color:'',message:''});

  const handletDelete = async (categoryId:number)=>{
  
  try {
      const response = await deleteCategory(categoryId);
      //filtramos la categoria borrada
  
      if(response.status === 'success'){
        setCategories(categories.filter(category => category.id !== categoryId));
      }
      setAlert({color:'bg-green-500',message:'Categoria Borrada'});
  } catch (error) {
      const err = error as AxiosError<LoginApiResponse>;
        
      if (err.response?.data?.message) {
            setAlert({color: "bg-red-500",message: err.response.data.message});
          } else {
            setAlert({color: "bg-red-500",message: "Error desconocido.",});
          } 

  }finally{
    setTimeout(() => {

      setAlert({color:'',message:''})

    }, 2000);
  }
}

  return (
    <div className='ml-4 bg-gray-700 p-6 rounded shadow-md'>
      {!alert.message? <h3 className='text-center font-bold mb-2'>Categorías</h3> : <Alert alert={alert}/>}
        <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center bg-gray-800 p-3 rounded">
            <div className="space-x-2">
                <span>{category.name}</span>

                <button
                
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
                >
                Editar
                </button>
                <button
                    onClick={()=>handletDelete(category.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                    >
                    Borrar
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList