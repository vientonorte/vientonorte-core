/**
 * Tests de FactorRegistry — registro de factores verificados.
 * STRIDE: Spoofing (niveles), Information disclosure (serialización).
 */
import { describe, expect, it } from 'vitest';
import { FactorRegistry } from './FactorRegistry';
import type { AuthFactor } from './types';

const password: AuthFactor = {
  type: 'password',
  level: 1,
  label: 'Contraseña',
  verifiedAt: new Date('2026-06-11T10:00:00Z'),
};
const totp: AuthFactor = { type: 'totp', level: 2, label: 'Google Authenticator' };
const passkey: AuthFactor = { type: 'passkey', level: 3, label: 'Touch ID' };

describe('FactorRegistry', () => {
  it('registry vacío reporta nivel 0 (anónimo)', () => {
    const registry = new FactorRegistry();
    expect(registry.getHighestLevel()).toBe(0);
    expect(registry.hasLevel(1)).toBe(false);
  });

  it('getHighestLevel retorna el máximo entre factores registrados', () => {
    const registry = new FactorRegistry();
    registry.register(password);
    expect(registry.getHighestLevel()).toBe(1);
    registry.register(totp);
    expect(registry.getHighestLevel()).toBe(2);
  });

  it('hasLevel acepta factores de nivel superior al pedido', () => {
    const registry = new FactorRegistry();
    registry.register(passkey);
    expect(registry.hasLevel(2)).toBe(true);
    expect(registry.hasLevel(3)).toBe(true);
  });

  it('re-registrar un tipo sobreescribe (re-verificación)', () => {
    const registry = new FactorRegistry();
    registry.register(password);
    const reverified = { ...password, verifiedAt: new Date('2026-06-11T12:00:00Z') };
    registry.register(reverified);
    expect(registry.getAll()).toHaveLength(1);
    expect(registry.get('password')?.verifiedAt).toEqual(reverified.verifiedAt);
  });

  it('unregister baja el nivel efectivo (revocación de dispositivo)', () => {
    const registry = new FactorRegistry();
    registry.register(password);
    registry.register(passkey);
    registry.unregister('passkey');
    expect(registry.getHighestLevel()).toBe(1);
  });

  it('getAll ordena por nivel descendente', () => {
    const registry = new FactorRegistry();
    registry.register(password);
    registry.register(passkey);
    registry.register(totp);
    expect(registry.getAll().map((f) => f.level)).toEqual([3, 2, 1]);
  });

  it('toJSON → fromJSON es un round-trip sin pérdida', () => {
    const registry = new FactorRegistry();
    registry.register(password);
    registry.register(totp);

    const restored = FactorRegistry.fromJSON(JSON.parse(JSON.stringify(registry.toJSON())));
    expect(restored.getHighestLevel()).toBe(2);
    expect(restored.get('password')?.verifiedAt).toEqual(password.verifiedAt);
    expect(restored.get('totp')?.verifiedAt).toBeUndefined();
  });

  it('fromJSON con datos vacíos retorna registry vacío (no lanza)', () => {
    expect(FactorRegistry.fromJSON({}).getHighestLevel()).toBe(0);
  });
});
