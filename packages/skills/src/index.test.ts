import { describe, expect, it } from 'vitest';
import { cierreDod, getSkill, listConnectors, listOnDemand, listSkills, metodoRo, resolveSkill } from './index';

describe('@vientonorte/skills', () => {
  it('lists public MCP skills', () => {
    const all = listSkills({ mcp: true });
    expect(all.length).toBeGreaterThanOrEqual(10);
    expect(getSkill('vn-agent')?.hosted).toContain('/ops/skills/vn-agent');
  });

  it('Método Ro hours are Calendar 18 ago', () => {
    expect(metodoRo().hours).toEqual({ m1: 5.5, vn: 1.5, post: 0.75, algonova: 3.5 });
    expect(metodoRo().no).toContain('80/10/10');
  });

  it('cierre DoD requires Retro deploy + VN branding', () => {
    const d = cierreDod();
    expect(d.mail.required_block).toBe('## Retro deploy');
    expect(d.mail.contact).toBe('contacto@vientonorte.io');
    expect(cierreDod({}).mail.to).toEqual([]);
    expect(cierreDod({ VN_CIERRE_MAIL_TO: 'a@x.test, b@x.test' }).mail.to).toEqual(['a@x.test', 'b@x.test']);
  });

  it('resolves on-demand skills without listing them', () => {
    expect(listSkills().some((s) => s.id === 'prospecto-local')).toBe(false);
    expect(getSkill('prospecto-local')).toBeUndefined();
    expect(resolveSkill('prospecto-local')?.where).toBe('machine');
    expect(listOnDemand().every((s) => s.public === false)).toBe(true);
    expect(listConnectors().find((c) => c.id === 'nvidia-cuda-docs')?.auth).toBe('oauth');
  });
});
