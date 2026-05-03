// Deterministic seeded random for stable variants per (city, service) page

export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededRng(seed: string) {
  return mulberry32(hashString(seed));
}

export function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)] as T;
}

export function pickN<T>(rng: () => number, arr: T[], n: number): T[] {
  const out: T[] = [];
  const used = new Set<number>();
  while (out.length < Math.min(n, arr.length)) {
    const i = Math.floor(rng() * arr.length);
    if (!used.has(i)) {
      used.add(i);
      out.push(arr[i] as T);
    }
  }
  return out;
}

export function shuffle<T>(rng: () => number, arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}
