import React from 'react'

const Categories = () => {
  return (
      <div className="flex justify-center items-center px-4">
    <form  className="w-full sm:w-full md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-700 p-6 rounded shadow-md">      
        
        <h2 className="text-center text-white text-xl font-bold mb-4">
          Registrate una categoría
        </h2>
        <div className="mt-2">
        <label className="block text-green-500 font-bold uppercase" htmlFor="username">Categoría</label>
        <input  className="bg-white rounded w-full p-2 text-stone-950" type="text" name="category" />
        </div>

        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full">
            Guardar
        </button>
        
  </form>
</div>
  )
}

export default Categories