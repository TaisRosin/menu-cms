import type { ProductDTO } from '@/cases/products/dtos/product.dto'
export type OrderStatus = 'NEW' | 'PREPARING' | 'READY' | 'DELIVERED'
export type OrderItemDTO = {
  id: string
  product: ProductDTO
  quantity: number
  price: string | number
  subtotal: string | number
}
export type OrderDTO = {
  id: string
  createdAt: string
  guestCheck: { id: string }
  status: OrderStatus
  total: string | number
  items: OrderItemDTO[]
}
