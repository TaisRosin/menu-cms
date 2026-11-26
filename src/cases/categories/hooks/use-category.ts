import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiConfigurationError } from '@/lib/axios'
import { CategoryService } from '../services/category.service'
import type { CategoryInputDTO } from '../dtos/category.dto'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: CategoryService.listAll,
    enabled: !apiConfigurationError,
    retry: false,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CategoryService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryInputDTO }) => CategoryService.update(id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['categories'] }),
        queryClient.invalidateQueries({ queryKey: ['products'] }),
      ])
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: CategoryService.remove,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['categories'] }),
        queryClient.invalidateQueries({ queryKey: ['products'] }),
      ])
    },
  })
}
