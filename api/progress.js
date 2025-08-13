export const config = { runtime: 'edge' };

import { head, put } from '@vercel/blob';

const PROGRESS_PATH = 'small-data/user-progress.json';

function defaultProgress() {
  return { completedTasks: [], totalStudyTime: 0 };
}

export default async function handler(request) {
  const { method } = request;

  try {
    if (method === 'GET') {
      const meta = await head(PROGRESS_PATH).catch(() => null);
      if (!meta) {
        const initial = defaultProgress();
        await put(PROGRESS_PATH, JSON.stringify(initial), {
          access: 'public',
          contentType: 'application/json',
          addRandomSuffix: false
        });
        return new Response(JSON.stringify(initial), {
          status: 200,
          headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
        });
      }

      const res = await fetch(meta.url, { cache: 'no-store' });
      if (!res.ok) {
        return new Response(JSON.stringify({ error: 'Failed to download progress blob' }), {
          status: 500,
          headers: { 'content-type': 'application/json' }
        });
      }
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
      });
    }

    if (method === 'POST' || method === 'PUT') {
      const payload = await request.json().catch(() => null);
      if (!payload || typeof payload !== 'object' || !Array.isArray(payload.completedTasks)) {
        return new Response(JSON.stringify({ error: 'Invalid payload' }), {
          status: 400,
          headers: { 'content-type': 'application/json' }
        });
      }
      const normalizeNumber = (n) => (Number.isFinite(Number(n)) && Number(n) >= 0 ? Number(n) : 0);
      const normalizeTimeMap = (obj, keys) => {
        const safe = {};
        keys.forEach(k => { safe[k] = normalizeNumber(obj?.[k]); });
        return safe;
      };
      const sanitized = {
        completedTasks: payload.completedTasks.slice(0, 500),
        totalStudyTime: normalizeNumber(payload.totalStudyTime),
        timeBySession: normalizeTimeMap(payload.timeBySession, ['morning','night','shortBreak']),
        timeByDay: normalizeTimeMap(payload.timeByDay, ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']),
        lastState: payload.lastState ?? null
      };
      await put(PROGRESS_PATH, JSON.stringify(sanitized), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false
      });
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Progress handler error', details: String(error) }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}

