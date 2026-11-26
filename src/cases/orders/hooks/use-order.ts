import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiConfigurationError } from '@/lib/axios'
import { OrderService } from '../services/order.service'
import type { OrderStatus } from '../dtos/order.dto'
export function useOrders(guestCheckId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['orders', guestCheckId],
    queryFn: () => OrderService.listAll(guestCheckId),
    enabled: enabled && !apiConfigurationError,
    retry: false,
    refetchInterval: 30000,
  })
}
export function useUpdateOrderStatus() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => OrderService.updateStatus(id, status),
    onSuccess: () => Promise.all([
      client.invalidateQueries({ queryKey: ['orders'] }),
      client.invalidateQueries({ queryKey: ['guest-checks'] }),
    ]),
  })
}
