import type { SpotDTO } from '@/cases/spots/dtos/spot.dto'
export type GuestCheckDTO = {
  id: string
  spot: SpotDTO
  status: 'OPENED' | 'CLOSED'
  createdAt: string
  total: string | number
}
