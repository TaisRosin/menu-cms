import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiConfigurationError } from '@/lib/axios'
import { ProductService } from '../services/product.service'
import type { ProductInputDTO } from '../dtos/product.dto'
export function useProducts(categoryId?: string) {
  return useQuery({
    queryKey: ['products', { categoryId: categoryId || null }],
    queryFn: () => ProductService.listAll(categoryId),
    enabled: !apiConfigurationError,
    retry: false,
  })
}
export function useCreateProduct() {
  const client = useQueryClient()
  return useMutation({ mutationFn: ProductService.create, onSuccess: () => client.invalidateQueries({ queryKey: ['products'] }) })
}
export function useUpdateProduct() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductInputDTO }) => ProductService.update(id, data),
    onSuccess: () => client.invalidateQueries({ queryKey: ['products'] }),
  })
}
export function useDeleteProduct() {
  const client = useQueryClient()
  return useMutation({ mutationFn: ProductService.remove, onSuccess: () => client.invalidateQueries({ queryKey: ['products'] }) })
}
