import { api } from '@/lib/axios'
import type { ProductDTO, ProductInputDTO } from '../dtos/product.dto'
const ENDPOINT = '/products'
export const ProductService = {
  async listAll(categoryId?: string): Promise<ProductDTO[]> {
    const response = await api.get<ProductDTO[]>(ENDPOINT, { params: { includeInactive: true, categoryId: categoryId || undefined } })
    return response.data
  },
  async create(data: ProductInputDTO): Promise<ProductDTO> {
    return (await api.post<ProductDTO>(ENDPOINT, data)).data
  },
  async update(id: string, data: ProductInputDTO): Promise<ProductDTO> {
    return (await api.patch<ProductDTO>(ENDPOINT + '/' + id, data)).data
  },
  async remove(id: string): Promise<void> {
    await api.delete(ENDPOINT + '/' + id)
  },
}
