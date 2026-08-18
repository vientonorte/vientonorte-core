import catalogJson from './catalog.json';

export type SkillEntry = {
  id: string;
  slash: string;
  kind: string;
  public?: boolean;
  mcp?: boolean;
  hosted?: string;
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

export function metodoRo() {
  return catalog.metodo_ro;
}

/** DoD Método Ro · cierre incluye mail resumen con branding VN. */
export function cierreDod() {
  return {
    hours: catalog.metodo_ro.hours,
    mail: {
      to: ['gaete.gaona@icloud.com'],
      voice: 'Viento Norte',
      contact: catalog.metodo_ro.contact,
      required_block: '## Retro deploy',
      branding: 'vientonorte.io · no rostro · no .cl',
    },
    no: catalog.metodo_ro.no,
  };
}
