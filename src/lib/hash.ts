export const SECTION_IDS = [
  'hero',
  'projects',
  'experience',
  'skills',
  'photos',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

const ALIASES: Record<string, SectionId> = {
  project: 'projects',
};

export const getHashId = () =>
  decodeURIComponent(window.location.hash.replace(/^#/, ''));

export const isSectionId = (id: string): id is SectionId =>
  (SECTION_IDS as readonly string[]).includes(id);

export const resolveSectionId = (hash: string): SectionId | null => {
  if (!hash) return null;
  if (hash in ALIASES) return ALIASES[hash];
  return isSectionId(hash) ? hash : null;
};

const toUrl = (id: string) => {
  const { pathname, search } = window.location;
  return id ? `${pathname}${search}#${id}` : `${pathname}${search}`;
};

export const setHash = (id: string, mode: 'push' | 'replace' = 'replace') => {
  const next = toUrl(id);
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current === next) return;
  if (mode === 'push') window.history.pushState(null, '', next);
  else window.history.replaceState(null, '', next);
};
