import { api } from '@/lib/axios'
import type { CategoryDTO } from '../dtos/category.dto'

const ENDPOINT = '/categories'

export const CategoryService = {
  async listAll(): Promise<CategoryDTO[]> {
    const response = await api.get<CategoryDTO[]>(ENDPOINT)
    return response.data
  },
}
