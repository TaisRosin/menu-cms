import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiConfigurationError } from '@/lib/axios'
import { SpotService } from '../services/spot.service'
import type { SpotInputDTO } from '../dtos/spot.dto'

export function useCategories() {
  return useQuery({
    queryKey: ['spots'],
    queryFn: SpotService.listAll,
    enabled: !apiConfigurationError,
    retry: false,
  })
}

export function useCreateSpot() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: SpotService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['spots'] }),
  })
}

export function useUpdateSpot() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SpotInputDTO }) => SpotService.update(id, data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['spots'] }),
        queryClient.invalidateQueries({ queryKey: ['guest-checks'] }),
      ])
    },
  })
}

export function useDeleteSpot() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: SpotService.remove,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['spots'] }),
        queryClient.invalidateQueries({ queryKey: ['guest-checks'] }),
      ])
    },
  })
}
