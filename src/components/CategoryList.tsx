import React from 'react'
import type { Category } from '../types/types'

interface CategoryListProps{
    categories: Category[];
}

const CategoryList = ({categories}: CategoryListProps) => {
  return (
    <div>CategoryList</div>
  )
}

export default CategoryList