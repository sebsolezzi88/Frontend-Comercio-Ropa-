import React from 'react'
import type { Category } from '../types/types'

interface CategoryListProps{
    categories: Category[];
}

const CategoryList = ({categories}: CategoryListProps) => {
  return (
    <div className='ml-4 bg-gray-700 p-6 rounded shadow-md'>
        <h3 className='text-center font-bold mb-2'>Categorías</h3>
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