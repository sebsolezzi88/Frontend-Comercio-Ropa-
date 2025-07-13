import  { useEffect, useState } from 'react'
import type { LoginApiResponse, Product } from '../types/types';
import type { AxiosError } from 'axios';
import { getProducts } from '../api/products';

const Main = () => {
  
  const [products, setProducts] = useState<Product[]>([]);

   
  useEffect(() => {
    const getProductsFromApi = async () => {
      try {
        const responsePro = await getProducts();
        if (responsePro.status === 'success' && Array.isArray(responsePro.products)) {
          setProducts(responsePro.products);
          // Guardar en localStorage
          localStorage.setItem('products', JSON.stringify(responsePro.products));
        }
      } catch (error) {
        const err = error as AxiosError<LoginApiResponse>;
        console.log(error);
        if (err.response?.data?.message) {
          console.log({ message: err.response.data.message });
        } else {
          console.log({ message: 'Error desconocido.' });
        }
      }
    };

    // Intentamos recuperar desde localStorage
    const productsFromStorage = localStorage.getItem('products');
    if (productsFromStorage) {
      try {
        const parsedProducts = JSON.parse(productsFromStorage);
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts);
        } else {
          getProductsFromApi(); // si está mal el formato, cargamos desde la API
        }
      } catch {
        getProductsFromApi(); // si hay error de parseo, cargamos desde la API
      }
    } else {
      getProductsFromApi(); // si no hay nada guardado, cargamos desde la API
    }
  }, []);
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
  
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">

          {
            products.map(product =>(
              <article className="bg-gray-700 p-4 rounded shadow-md">
                <img src={product.urlImage} alt={product.name} className="w-full md:h-auto lg:h-50 rounded mb-2" />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
                  Ver talles y Precios</button>
             </article>
            ))
          }
    
        </div>
      </section>
   </>
  )
}

export default Main