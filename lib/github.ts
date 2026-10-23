const REPO_API = 'https://api.github.com/repos/orkstage/orkstage';

/**
 * Star count of the main repository, read at build time (and every hour in server mode). A static
 * export keeps the number of its build; the scheduled CI build refreshes it daily. Returns null when
 * GitHub cannot be reached, so the header never shows a made up number.
 */
export async function repoStars(): Promise<number | null> {
  try {
    const res = await fetch(REPO_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { stargazers_count?: unknown };
    return typeof body.stargazers_count === 'number' ? body.stargazers_count : null;
  } catch {
    return null;
  }
}

/** 1234 becomes "1.2K" (or "1,2 mil" in Portuguese). */
export function formatStars(count: number, locale: string): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(count);
}
