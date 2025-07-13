import  { useEffect, useState } from 'react'
import type { LoginApiResponse, Product } from '../types/types';
import type { AxiosError } from 'axios';
import { getProducts } from '../api/products';

const Main = () => {
  
  const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
          const getProductsFromApi = async () =>{
            
            try {
      
              const responsePro = await getProducts();
              if(responsePro.status === 'success' && responsePro.status === 'success'){
                setProducts(responsePro.products);
  
              }
      
            } catch (error) {
              const err = error as AxiosError<LoginApiResponse>;
              console.log(error);
              if (err.response?.data?.message) {
                  console.log({message: err.response.data.message});
              } else {
                  console.log({message: "Error desconocido.",});
              } 
            }
          }
          getProductsFromApi();
        }, [])

  return (
   <>
      <main className="mt-5 p-4 text-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido a GeekStore!</h1>
        <p className="text-2xl">
            Vendemos <strong>remeras</strong> y <strong>buzos</strong> con temática geek inspirada en
            <span className="text-green-400 font-semibold"> programación</span> y sistemas operativos como
            <span className="text-blue-400 font-semibold"> Windows</span> y
            <span className="text-red-400 font-semibold"> Linux</span>.
        </p>
      </main>

      <section className="p-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-4">Nuestros Productos</h2>
  
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  
          <article className="bg-gray-700 p-4 rounded shadow-md">
            <img src="remera-linux.jpg" alt="Remera Linux" className="w-full h-auto rounded mb-2" />
            <h3 className="text-xl font-semibold">Remera Linux</h3>
            <p className="text-green-400 font-bold">$3500</p>
          </article>

          <article className="bg-gray-700 p-4 rounded shadow-md">
            <img src="buzo-windows.jpg" alt="Buzo Windows" className="w-full h-auto rounded mb-2" />
            <h3 className="text-xl font-semibold">Buzo Windows</h3>
            <p className="text-green-400 font-bold">$4800</p>
          </article>
    
    
        </div>
      </section>
   </>
  )
}

export default Main