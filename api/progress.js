export const config = { runtime: 'nodejs' };

import { head, put } from '@vercel/blob';

const PROGRESS_PATH = 'small-data/user-progress.json';

function defaultProgress() {
  return {
    completedTasks: [],
    totalStudyTime: 0,
    lastState: null,
    timeBySession: { morning: 0, night: 0, shortBreak: 0 },
    timeByDay: { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0 }
  };
}

async function readJsonBody(req) {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === 'GET') {
      const meta = await head(PROGRESS_PATH).catch((e) => {
        console.error('Blob head(progress) failed:', e);
        return null;
      });
      if (!meta) {
        const initial = defaultProgress();
        try {
          await put(PROGRESS_PATH, JSON.stringify(initial), {
            access: 'public',
            contentType: 'application/json',
            addRandomSuffix: false
          });
          return res.status(200).setHeader('cache-control', 'no-store').json(initial);
        } catch (e) {
          console.error('Blob put(progress) failed (returning default):', e);
          return res.status(200).setHeader('cache-control', 'no-store').json(initial);
        }
      }

      try {
        const download = await fetch(meta.url, { cache: 'no-store' });
        if (!download.ok) throw new Error('Failed to download progress blob');
        const data = await download.json();
        return res.status(200).setHeader('cache-control', 'no-store').json(data);
      } catch (e) {
        console.error('Download progress blob failed (returning default):', e);
        return res.status(200).setHeader('cache-control', 'no-store').json(defaultProgress());
      }
    }

    if (method === 'POST' || method === 'PUT') {
      const payload = await readJsonBody(req);
      if (!payload || typeof payload !== 'object' || !Array.isArray(payload.completedTasks)) {
        return res.status(400).json({ error: 'Invalid payload' });
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
      return res.status(200).json({ ok: true });
    }

    return res.status(405).send('Method Not Allowed');
  } catch (error) {
    return res.status(500).json({ error: 'Progress handler error', details: String(error) });
  }
}

