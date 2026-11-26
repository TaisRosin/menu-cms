import { api } from '@/lib/axios'
import type { CategoryDTO, CategoryInputDTO } from '../dtos/category.dto'

const ENDPOINT = '/categories'

export const CategoryService = {
  async listAll(): Promise<CategoryDTO[]> {
    const response = await api.get<CategoryDTO[]>(ENDPOINT)
    return response.data
  },
  async create(data: CategoryInputDTO): Promise<CategoryDTO> {
    const response = await api.post<CategoryDTO>(ENDPOINT, data)
    return response.data
  },
  async update(id: string, data: CategoryInputDTO): Promise<CategoryDTO> {
    const response = await api.patch<CategoryDTO>(`${ENDPOINT}/${id}`, data)
    return response.data
  },
  async remove(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`)
  },
}
