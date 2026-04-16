const STORAGE_KEY = "startech-demo-usage";
const MAX_PER_TYPE_PER_HOUR = 3;
const MAX_TOTAL_PER_DAY = 15;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

interface UsageRecord {
  [demoType: string]: number[];
}

function getUsage(): UsageRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function pruneAndSave(usage: UsageRecord): UsageRecord {
  const now = Date.now();
  const cutoff = now - DAY_MS;
  const pruned: UsageRecord = {};
  for (const [key, timestamps] of Object.entries(usage)) {
    const fresh = timestamps.filter((t) => t > cutoff);
    if (fresh.length > 0) pruned[key] = fresh;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
  } catch {}
  return pruned;
}

export function useDemoRateLimiter(demoType: string) {
  const usage = pruneAndSave(getUsage());
  const now = Date.now();
  const hourAgo = now - HOUR_MS;

  const typeTimestamps = usage[demoType] || [];
  const typeCountLastHour = typeTimestamps.filter((t) => t > hourAgo).length;

  const allTimestamps = Object.values(usage).flat();
  const totalCountToday = allTimestamps.length;

  const canSubmit =
    typeCountLastHour < MAX_PER_TYPE_PER_HOUR &&
    totalCountToday < MAX_TOTAL_PER_DAY;

  const remainingType = Math.max(0, MAX_PER_TYPE_PER_HOUR - typeCountLastHour);
  const remainingTotal = Math.max(0, MAX_TOTAL_PER_DAY - totalCountToday);
  const remainingUses = Math.min(remainingType, remainingTotal);

  let resetTime: Date | null = null;
  if (!canSubmit) {
    if (typeCountLastHour >= MAX_PER_TYPE_PER_HOUR && typeTimestamps.length > 0) {
      const oldest = typeTimestamps
        .filter((t) => t > hourAgo)
        .sort((a, b) => a - b)[0];
      resetTime = new Date(oldest + HOUR_MS);
    } else {
      const oldestToday = allTimestamps.sort((a, b) => a - b)[0];
      resetTime = new Date(oldestToday + DAY_MS);
    }
  }

  return { canSubmit, remainingUses, resetTime };
}

export function recordDemoUsage(demoType: string): void {
  const usage = getUsage();
  if (!usage[demoType]) usage[demoType] = [];
  usage[demoType].push(Date.now());
  pruneAndSave(usage);
}
