import { api } from '@/lib/axios'
import type { GuestCheckDTO } from '../dtos/guest-check.dto'
const ENDPOINT = '/guest-checks'
export const GuestCheckService = {
  async listOpened(): Promise<GuestCheckDTO[]> { return (await api.get<GuestCheckDTO[]>(ENDPOINT)).data },
  async findOne(id: string): Promise<GuestCheckDTO> { return (await api.get<GuestCheckDTO>(ENDPOINT + '/' + id)).data },
}
