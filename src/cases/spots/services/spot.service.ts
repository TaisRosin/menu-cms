import { api } from '@/lib/axios'
import type { SpotDTO, SpotInputDTO } from '../dtos/spot.dto'

const ENDPOINT = '/spots'

export const SpotService = {
  async listAll(): Promise<SpotDTO[]> {
    const response = await api.get<SpotDTO[]>(ENDPOINT)
    return response.data
  },
  async create(data: SpotInputDTO): Promise<SpotDTO> {
    const response = await api.post<SpotDTO>(ENDPOINT, data)
    return response.data
  },
  async update(id: string, data: SpotInputDTO): Promise<SpotDTO> {
    const response = await api.patch<SpotDTO>(`${ENDPOINT}/${id}`, data)
    return response.data
  },
  async remove(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`)
  },
}
