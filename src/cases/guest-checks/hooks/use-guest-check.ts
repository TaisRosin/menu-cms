import { useQuery } from '@tanstack/react-query'
import { apiConfigurationError } from '@/lib/axios'
import { GuestCheckService } from '../services/guest-check.service'
export function useOpenedGuestChecks() {
  return useQuery({ queryKey: ['guest-checks', 'opened'], queryFn: GuestCheckService.listOpened, enabled: !apiConfigurationError, retry: false, refetchInterval: 30000 })
}
export function useGuestCheck(id: string) {
  return useQuery({ queryKey: ['guest-checks', id], queryFn: () => GuestCheckService.findOne(id), enabled: !apiConfigurationError, retry: false, refetchInterval: 30000 })
}
