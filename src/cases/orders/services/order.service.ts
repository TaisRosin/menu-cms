import { api } from '@/lib/axios'
import type { OrderDTO, OrderStatus } from '../dtos/order.dto'
const ENDPOINT = '/orders'
export const OrderService = {
  async listAll(guestCheckId?: string): Promise<OrderDTO[]> { return (await api.get<OrderDTO[]>(ENDPOINT, { params: { guestCheckId } })).data },
  async updateStatus(id: string, status: OrderStatus): Promise<OrderDTO> { return (await api.patch<OrderDTO>(ENDPOINT + '/' + id + '/status', { status })).data },
}
