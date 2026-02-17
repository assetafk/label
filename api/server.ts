import cors from 'cors'
import express from 'express'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type WorkBlock =
  | { type: 'text'; title: string; body: string }
  | { type: 'image'; alt: string; src: string; caption?: string }

type WorkCover =
  | { kind: 'gradient'; from: string; to: string }
  | { kind: 'image'; src: string; alt: string }

export type Work = {
  slug: string
  title: string
  tagline: string
  year: number
  services: string[]
  industry: string
  cover?: WorkCover
  gallery?: { src: string; alt: string }[]
  blocks: WorkBlock[]
}

export type Client = { name: string; kind: string }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, 'data')

async function readJson<T>(fileName: string): Promise<T> {
  const raw = await readFile(path.join(dataDir, fileName), 'utf8')
  return JSON.parse(raw) as T
}

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/],
    credentials: false,
  }),
)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/works', async (req, res) => {
  const works = await readJson<Work[]>('works.json')

  const q = typeof req.query.q === 'string' ? req.query.q.trim() : ''
  const service = typeof req.query.service === 'string' ? req.query.service : ''
  const year = typeof req.query.year === 'string' ? Number(req.query.year) : null

  const filtered = works.filter((w) => {
    if (q) {
      const hay = `${w.title} ${w.tagline} ${w.industry} ${w.services.join(' ')}`.toLowerCase()
      if (!hay.includes(q.toLowerCase())) return false
    }
    if (service && !w.services.some((s) => s.toLowerCase() === service.toLowerCase())) return false
    if (Number.isFinite(year) && year !== null && w.year !== year) return false
    return true
  })

  res.json({ items: filtered })
})

app.get('/api/works/:slug', async (req, res) => {
  const works = await readJson<Work[]>('works.json')
  const work = works.find((w) => w.slug === req.params.slug)
  if (!work) return res.status(404).json({ message: 'Work not found' })
  return res.json(work)
})

app.get('/api/clients', async (_req, res) => {
  const clients = await readJson<Client[]>('clients.json')
  res.json({ items: clients })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {}
  const issues: string[] = []
  if (typeof name !== 'string' || name.trim().length < 2) issues.push('name')
  if (typeof email !== 'string' || !email.includes('@')) issues.push('email')
  if (typeof message !== 'string' || message.trim().length < 10) issues.push('message')

  if (issues.length) {
    return res.status(400).json({ ok: false, issues })
  }

  // Simulate latency to demonstrate mutation UX.
  await new Promise((r) => setTimeout(r, 450))

  return res.json({
    ok: true,
    receivedAt: new Date().toISOString(),
  })
})

const port = Number(process.env.PORT ?? 5175)
const server = app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`)
})

server.on('error', (err) => {
  if (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code?: unknown }).code === 'EADDRINUSE'
  ) {
    console.error(
      `[api] port ${port} is already in use. Set PORT=... or stop the process using it.`,
    )
  }
  console.error('[api] server error', err)
  process.exitCode = 1
})

process.on('SIGTERM', () => {
  server.close(() => process.exit(0))
})

process.on('SIGINT', () => {
  server.close(() => process.exit(0))
})

