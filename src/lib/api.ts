export type WorkBlock =
  | { type: 'text'; title: string; body: string }
  | { type: 'image'; alt: string; src: string }

export type Work = {
  slug: string
  title: string
  tagline: string
  year: number
  services: string[]
  industry: string
  cover?: { kind: 'gradient'; from: string; to: string }
  blocks: WorkBlock[]
}

export type Client = { name: string; kind: string }

export type WorksResponse = { items: Work[] }
export type ClientsResponse = { items: Client[] }

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type ContactResponse =
  | { ok: true; receivedAt: string }
  | { ok: false; issues: string[] }

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const API_BASE =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:5175'

async function parseJsonSafely(res: Response) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  if (!res.ok) {
    const data = await parseJsonSafely(res)
    const message =
      (data && typeof data.message === 'string' && data.message) ||
      `${res.status} ${res.statusText}`
    throw new ApiError(message, res.status)
  }

  return (await res.json()) as T
}

export type ListWorksParams = {
  q?: string
  service?: string
  year?: number
  signal?: AbortSignal
}

export async function listWorks(params: ListWorksParams = {}) {
  const sp = new URLSearchParams()
  if (params.q) sp.set('q', params.q)
  if (params.service) sp.set('service', params.service)
  if (typeof params.year === 'number') sp.set('year', String(params.year))
  const query = sp.toString()

  return apiFetch<WorksResponse>(`/api/works${query ? `?${query}` : ''}`, {
    signal: params.signal,
  })
}

export async function getWork(slug: string, signal?: AbortSignal) {
  return apiFetch<Work>(`/api/works/${encodeURIComponent(slug)}`, { signal })
}

export async function listClients(signal?: AbortSignal) {
  return apiFetch<ClientsResponse>('/api/clients', { signal })
}

export async function sendContact(payload: ContactPayload) {
  return apiFetch<ContactResponse>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

