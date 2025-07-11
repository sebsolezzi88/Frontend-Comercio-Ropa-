import React from 'react'

const ListaProductos = () => {
  return (
    <>
       <h2 className='text-2xl'>Productos</h2>
       <div className="flex items-center gap-2 my-4">
            <h3 className="text-lg font-semibold">Filtrar por</h3>
            <select className="font-bold uppercase px-2 py-1 rounded" name="categoryId" id="category">
                <option value="">Todas</option>
                <option value="buzos">Buzos</option>
            </select>
        </div>
       
        <div className="flex gap-3 mt-4">

        <div className='bg-gray-500 w-50 p-2 '>
            <img src="https://i.imgur.com/M0LumNT.jpeg" alt="" />
            <h4 className='text-xl'>Remera React</h4>
            <p>Buzo negro de algodon. Con estampa termosellada</p>
            <div className='flex gap-2'>
                <button className='mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded'>Editar</button>
                <button className='mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'>Eliminar</button>
            </div>
        </div>
        
    </div>
    </>
     
  )
}

export default ListaProductos