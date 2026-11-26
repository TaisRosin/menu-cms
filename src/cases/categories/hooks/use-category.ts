import { useQuery } from '@tanstack/react-query'
import { apiConfigurationError } from '@/lib/axios'
import { CategoryService } from '../services/category.service'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: CategoryService.listAll,
    enabled: !apiConfigurationError,
    retry: false,
  })
}
