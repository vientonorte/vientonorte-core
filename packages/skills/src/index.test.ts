import { describe, expect, it } from 'vitest';
import { cierreDod, getSkill, listSkills, metodoRo } from './index';

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
  });
});
