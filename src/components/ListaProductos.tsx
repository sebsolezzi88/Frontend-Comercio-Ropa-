import React, { useEffect, useState, type FormEvent } from 'react'
import type { AlertMessage, Category, LoginApiResponse, Product } from '../types/types';
import { getCategories } from '../api/categoty';
import { deleteProduct, getProducts, updateProduct } from '../api/products';
import type { AxiosError } from 'axios';
import Alert from './Alert';
import ProductVariants from './ProductVariants';


const ListaProductos = () => {

    const [alert, setAlert] = useState<AlertMessage>({});
    const [categories, setCategories] = useState<Category[]>([]); //arreglo para las categorias.
    const [products, setProducts] = useState<Product[]>([]); //arreglo para los productos.
    const [selectedCategory, setSelectedCategory] = useState(''); //variable para filtrar categorias

    //Estados para eliminar un producto
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    //Estado para el agregar variante de producto
    const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
    const [productAddVariant, setProductAddVariant] = useState<Product | null>(null);

    //states para editar un producto
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product>({
            id: 0,
            name: '',
            description: '',
            urlImage: '',
            categoryId: 0
            });

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

    
    //Funcion para abrir el modal e editar
    const handleEditClick = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    //Funcion para abrir el modal y agregar una Variante
    const handleAddVariantClick = (product: Product) =>{
        setIsVariantModalOpen(true);
        setProductAddVariant(product);
    }
    //Funcion para abrir el modal y eliminar
    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };
    const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
        const response = await deleteProduct(productToDelete); 
        if (response.status === 'success') {
            setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
            setAlert({ color: 'bg-green-500', message: 'Producto eliminado correctamente' });
        } else {
            setAlert({ color: 'bg-red-500', message: 'Error al eliminar el producto' });
        }
    } catch (error) {
        const err = error as AxiosError<LoginApiResponse>;
        console.log(error)
        if (err.response?.data?.message) {
            setAlert({color: "bg-red-500",message: err.response.data.message});
        } else {
            setAlert({color: "bg-red-500",message: "Error desconocido.",});
        } 
    } finally {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
        setTimeout(() => {
                setAlert({color: '',message: ''});
            }, 2000);
    }
};

    const handletUpdate = async (e:FormEvent) =>{
        try {
            e.preventDefault();
            if (
            productToEdit.name.trim() === '' ||
            productToEdit.description.trim() === '' ||
            productToEdit.urlImage.trim() === '' ||
            productToEdit.categoryId === null
            ) {
          setAlert({
            color: 'bg-red-500',
            message: 'Todos los campos son obligatorios'
          });
          return;
        }
            const response = await updateProduct(productToEdit);
            if(response.status === 'success'){
                const productUpdated = response.product;
                setProducts(products.map(product=> product.id === productUpdated.id ? productUpdated : product));
                setAlert({color: "bg-green-500",message: "Producto Actualizado"});
            }
            setIsModalOpen(false);
        } catch (error) {
            const err = error as AxiosError<LoginApiResponse>;
            console.log(error)
            if (err.response?.data?.message) {
            setAlert({color: "bg-red-500",message: err.response.data.message});
            } else {
            setAlert({color: "bg-red-500",message: "Error desconocido.",});
            } 
        }finally{
            setTimeout(() => {
                setAlert({color: '',message: ''});
            }, 2000);
        }
    }

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.categoryId === parseInt(selectedCategory))
        : products;
  return (
    <>
    {alert.message ?  <Alert alert={alert} /> : <h2 className='text-2xl'>Productos</h2> }
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
                <div className='flex flex-col '>
                    <button onClick={() => handleEditClick(product)} className='mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded'>Editar</button>
                    <button onClick={() => handleDeleteClick(product)} className='mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'>Eliminar</button>
                    <button onClick={() => handleAddVariantClick(product)} className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'>Agregar Variante</button>
                </div>
            </div>
        ))}
    </div>

    {isModalOpen && (
        <div className="fixed inset-0 bg-black  flex justify-center items-center z-50">
            <form
            onSubmit={handletUpdate}
            className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md relative"
            >
            <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-4 text-white text-2xl font-bold"
            >
                &times;
            </button>
            {alert.message ?  <Alert alert={alert} /> : 
            (<h2 className="text-center text-white text-xl font-bold mb-4">
                Editar producto
            </h2>)}
            

            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="productname">
                Nombre
                </label>
                <input
                onChange={(e) => setProductToEdit({ ...productToEdit, name: e.target.value })}
                value={productToEdit.name}
                className="bg-white rounded w-full p-2 text-stone-950"
                type="text"
                name="name"
                id="productname"
                />
            </div>

            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="description">
                Descripción
                </label>
                <input
                onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
                value={productToEdit.description}
                className="bg-white rounded w-full p-2 text-stone-950"
                type="text"
                name="description"
                />
            </div>

            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="urlImage">
                Url Imagen
                </label>
                <input
                onChange={(e) => setProductToEdit({ ...productToEdit, urlImage: e.target.value })}
                value={productToEdit.urlImage}
                className="bg-white rounded w-full p-2 text-stone-950"
                type="text"
                name="urlImage"
                />
                <small className="text-white block mt-1">
                Puede subir imágenes a{" "}
                <a className="text-green-500" href="https://imgur.com/" target="_blank" rel="noreferrer">
                    imgur.com
                </a>
                </small>
            </div>

            <div className="mt-2">
                <label className="block text-green-500 font-bold uppercase" htmlFor="categoryId">
                Categoría
                </label>
                <select
                onChange={(e) =>
                    setProductToEdit({
                    ...productToEdit,
                    categoryId: parseInt(e.target.value)
                    })
                }
                value={productToEdit.categoryId ?? ''}
                className="w-full font-bold uppercase"
                name="categoryId"
                id="categoryId"
                >
                <option value="">-- Seleccione una categoría ---</option>
                {categories.map((category) => (
                    <option
                    className="bg-white text-stone-950 font-bold uppercase"
                    key={category.id}
                    value={category.id}
                    >
                    {category.name}
                    </option>
                ))}
                </select>
            </div>

            <div className="flex justify-end mt-4 gap-4">
                <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                Guardar cambios
                </button>
            </div>
            </form>
        </div>
        )}

    {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center w-80">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
                ¿Estás seguro que deseas eliminar este producto?
            </h3>
            <p className="text-gray-700 mb-4">{productToDelete?.name}</p>
            <div className="flex justify-center gap-4">
                <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                Sí, eliminar
                </button>
                <button
                onClick={() => {
                    setIsDeleteModalOpen(false);
                    setProductToDelete(null);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
                >
                Cancelar
                </button>
            </div>
            </div>
        </div>
        )}
    {isVariantModalOpen && <ProductVariants/>}
    </>
  )
}

export default ListaProductos