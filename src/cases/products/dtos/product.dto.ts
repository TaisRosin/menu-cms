import type { CategoryDTO } from '@/cases/categories/dtos/category.dto'
export type ProductDTO = {
  id: string
  name: string
  description: string | null
  price: number | string
  picture: string | null
  category: CategoryDTO | null
  active: boolean
  vegetarian: boolean
  isNew: boolean
}
export type ProductInputDTO = {
  name: string
  description: string | null
  price: number
  picture: string | null
  categoryId: string | null
  active: boolean
  vegetarian: boolean
  isNew: boolean
}
