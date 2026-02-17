import { useQuery } from '@tanstack/react-query'
import { listClients } from '../lib/api'

export function clientsKey() {
  return ['clients'] as const
}

export function useClients() {
  return useQuery({
    queryKey: clientsKey(),
    queryFn: ({ signal }) => listClients(signal),
    select: (data) => data.items,
  })
}

