type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

export function rateLimit(key: string, max: number, windowMs: number): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: max - 1, resetAt: now + windowMs }
  }
  if (entry.count >= max) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt }
  }
  entry.count += 1
  store.set(key, entry)
  return { ok: true, remaining: max - entry.count, resetAt: entry.resetAt }
}
