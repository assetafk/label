import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getWork, listWorks, type ListWorksParams } from '../lib/api'

export function worksKey(params: Omit<ListWorksParams, 'signal'>) {
  return ['works', params] as const
}

export function workKey(slug: string) {
  return ['work', slug] as const
}

export function useWorks(params: Omit<ListWorksParams, 'signal'>) {
  return useQuery({
    queryKey: worksKey(params),
    queryFn: ({ signal }) => listWorks({ ...params, signal }),
    select: (data) => data.items,
  })
}

export function useWork(slug: string) {
  return useQuery({
    queryKey: workKey(slug),
    queryFn: ({ signal }) => getWork(slug, signal),
    enabled: Boolean(slug),
  })
}

export function usePrefetchWork() {
  const qc = useQueryClient()

  return (slug: string) =>
    qc.prefetchQuery({
      queryKey: workKey(slug),
      queryFn: ({ signal }) => getWork(slug, signal),
      staleTime: 60_000,
    })
}

