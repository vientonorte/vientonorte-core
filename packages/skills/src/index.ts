import catalogJson from './catalog.json';
import connectorsJson from './connectors.json';
import onDemandJson from './on-demand.json';

export type SkillEntry = {
  id: string;
  slash: string;
  kind: string;
  public?: boolean;
  mcp?: boolean;
  hosted?: string;
  /** Path inside this package, relative to packages/skills. The body is on disk. */
  local?: string;
};

export type SkillsCatalog = {
  version: string;
  updated: string;
  hosted: string;
  mcp: string;
  api: string;
  kv: string;
  metodo_ro: {
    hours: { m1: number; vn: number; post: number; algonova: number };
    no: string[];
    contact: string;
    sem: string;
    cierre_mail: string;
  };
  skills: SkillEntry[];
};

/** Skill addressed from core. The markdown stays on the machine, except body=mounted. */
export type OnDemandSkill = {
  id: string;
  slash: string;
  public: false;
  body: 'machine' | 'mounted';
  local?: string;
  use: string;
};

export type Connector = {
  id: string;
  transport: 'plugin' | 'stdio' | 'http';
  auth: 'account' | 'oauth' | 'none';
  use: string;
  url?: string;
  command?: string;
  args?: string[];
};

export const catalog = catalogJson as SkillsCatalog;

export function listSkills(filter?: { kind?: string; mcp?: boolean }): SkillEntry[] {
  return catalog.skills.filter((s) => {
    if (filter?.kind && s.kind !== filter.kind) return false;
    if (filter?.mcp && !s.mcp) return false;
    return s.public !== false;
  });
}

export function getSkill(id: string): SkillEntry | undefined {
  const key = id.replace(/^\//, '').toLowerCase();
  return catalog.skills.find(
    (s) => s.id === key || s.slash.replace(/^\//, '').toLowerCase() === key
  );
}

/** Public catalog first. Otherwise the on-demand id, whose body is not in git. */
export function resolveSkill(
  id: string
): { where: 'catalog' | 'machine' | 'mounted'; entry: SkillEntry | OnDemandSkill } | undefined {
  const published = getSkill(id);
  if (published) return { where: 'catalog', entry: published };
  const key = id.replace(/^\//, '').toLowerCase();
  const extra = (onDemandJson.skills as OnDemandSkill[]).find(
    (s) => s.id === key || s.slash.replace(/^\//, '').toLowerCase() === key
  );
  if (!extra) return undefined;
  return { where: extra.body === 'mounted' ? 'mounted' : 'machine', entry: extra };
}

export function listOnDemand(): OnDemandSkill[] {
  return onDemandJson.skills as OnDemandSkill[];
}

export function listConnectors(): Connector[] {
  return connectorsJson.connectors as Connector[];
}

export function metodoRo() {
  return catalog.metodo_ro;
}

/** DoD Método Ro · cierre incluye mail resumen con branding VN. */
/** Destinatario del mail de cierre: env VN_CIERRE_MAIL_TO (coma-separado); nunca en el repo. */
export function cierreDod(env: Record<string, string | undefined> = (globalThis as any).process?.env ?? {}) {
  const to = (env.VN_CIERRE_MAIL_TO ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  return {
    hours: catalog.metodo_ro.hours,
    mail: {
      to,
      voice: 'Viento Norte',
      contact: catalog.metodo_ro.contact,
      required_block: '## Retro deploy',
      branding: 'vientonorte.io · no rostro · no .cl',
    },
    no: catalog.metodo_ro.no,
  };
}
