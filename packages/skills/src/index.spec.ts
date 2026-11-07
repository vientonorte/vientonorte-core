import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { catalog, cierreDod, getSkill, listConnectors, listOnDemand, listSkills, metodoRo, resolveSkill } from './index';

describe('@vientonorte/skills', () => {
  it('lists public MCP skills', () => {
    const all = listSkills({ mcp: true });
    expect(all.length).toBeGreaterThanOrEqual(10);
    expect(getSkill('vn-agent')?.hosted).toContain('/ops/skills/vn-agent');
  });

  it('Método Ro hours are Calendar 18 ago', () => {
    expect(metodoRo().hours).toEqual({ m1: 0, vn: 1.5, post: 0.75, algonova: 3.5 });
    expect(metodoRo().no).toContain('80/10/10');
  });

  it('cierre DoD requires Retro deploy + VN branding', () => {
    const d = cierreDod();
    expect(d.mail.required_block).toBe('## Retro deploy');
    expect(d.mail.contact).toBe('contacto@vientonorte.io');
    expect(cierreDod({}).mail.to).toEqual([]);
    expect(cierreDod({ VN_CIERRE_MAIL_TO: 'a@x.test, b@x.test' }).mail.to).toEqual(['a@x.test', 'b@x.test']);
  });

  it('catalog version matches the package and check-safety uses the mounted id', () => {
    const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version: string };
    expect(catalog.version).toBe(pkg.version);
    expect(getSkill('check-safety')).toBeUndefined();
    expect(getSkill('check-safety-thresholds')?.local).toBe('mounted/check-safety-thresholds/SKILL.md');
    expect(resolveSkill('check-safety-thresholds')?.where).toBe('catalog');
    expect(listOnDemand().some((skill) => skill.id === 'check-safety-thresholds')).toBe(false);
  });

  it('resolves on-demand skills without listing them', () => {
    expect(listSkills().some((s) => s.id === 'bujo-ro')).toBe(false);
    expect(getSkill('bujo-ro')).toBeUndefined();
    expect(resolveSkill('bujo-ro')?.where).toBe('machine');
    expect(getSkill('prospecto-local')?.local).toBe('mounted/prospecto-local/SKILL.md');
    expect(resolveSkill('prospecto-local')?.where).toBe('catalog');
    expect(resolveSkill('ollama')?.where).toBe('catalog');
    expect(listOnDemand().every((s) => s.public === false)).toBe(true);
    expect(listConnectors().find((c) => c.id === 'nvidia-cuda-docs')?.auth).toBe('oauth');
  });
});
