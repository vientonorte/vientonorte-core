/**
 * Tests de SessionManager y requireFactor — sesión, timeout y step-up auth.
 * STRIDE: Elevation of privilege (requireLevel), Tampering (estado frozen),
 * Information disclosure (persistencia en sessionStorage).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FactorRegistry } from './FactorRegistry';
import { SessionManager } from './SessionManager';
import { requireFactor } from './requireFactor';
import type { FactorRequirement } from './types';

function registryWithLevel(level: 1 | 2 | 3): FactorRegistry {
  const registry = new FactorRegistry();
  registry.register({ type: 'password', level: 1, label: 'Contraseña' });
  if (level >= 2) registry.register({ type: 'totp', level: 2, label: 'TOTP' });
  if (level >= 3) registry.register({ type: 'passkey', level: 3, label: 'Passkey' });
  return registry;
}

beforeEach(() => {
  vi.useFakeTimers();
  sessionStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('SessionManager — timeout', () => {
  it('no expira dentro de la ventana de inactividad', () => {
    const session = new SessionManager({ timeoutMs: 60_000 });
    vi.advanceTimersByTime(30_000);
    expect(session.isExpired()).toBe(false);
  });

  it('expira tras superar el timeout sin actividad', () => {
    const session = new SessionManager({ timeoutMs: 60_000 });
    vi.advanceTimersByTime(61_000);
    expect(session.isExpired()).toBe(true);
  });

  it('updateActivity extiende la expiración', () => {
    const session = new SessionManager({ timeoutMs: 60_000 });
    vi.advanceTimersByTime(50_000);
    session.updateActivity();
    vi.advanceTimersByTime(50_000);
    expect(session.isExpired()).toBe(false);
  });
});

describe('SessionManager — step-up (requireLevel)', () => {
  it('concede acceso cuando el registry cumple el nivel', () => {
    const session = new SessionManager();
    const result = session.requireLevel(
      { minLevel: 2, reason: 'Ver datos sensibles' },
      registryWithLevel(2)
    );
    expect(result).toEqual({ success: true, newLevel: 2 });
  });

  it('deniega y retorna el requirement cuando falta nivel', () => {
    const session = new SessionManager();
    const requirement: FactorRequirement = {
      minLevel: 3,
      reason: 'Transferir fondos requiere passkey',
    };
    const result = session.requireLevel(requirement, registryWithLevel(1));
    expect(result).toEqual({ success: false, required: requirement, currentLevel: 1 });
  });

  it('deniega con sesión expirada aunque el registry tenga nivel', () => {
    const session = new SessionManager({ timeoutMs: 1_000 });
    vi.advanceTimersByTime(2_000);
    const result = session.requireLevel({ minLevel: 1, reason: 'x' }, registryWithLevel(3));
    expect(result.success).toBe(false);
    if (!result.success) expect(result.currentLevel).toBe(0);
  });

  it('respeta allowedFactors: nivel suficiente pero tipo no permitido → deniega', () => {
    const session = new SessionManager();
    const result = session.requireLevel(
      { minLevel: 2, reason: 'Solo TOTP o passkey', allowedFactors: ['passkey'] },
      registryWithLevel(2) // tiene totp (nivel 2) pero no passkey
    );
    expect(result.success).toBe(false);
  });

  it('requireFactor es equivalente a requireLevel', () => {
    const session = new SessionManager();
    const result = requireFactor(2, 'Ver datos sensibles', registryWithLevel(2), session);
    expect(result).toEqual({ success: true, newLevel: 2 });
  });
});

describe('SessionManager — estado y persistencia', () => {
  it('getState retorna copia frozen (anti-tampering)', () => {
    const session = new SessionManager();
    const state = session.getState();
    expect(Object.isFrozen(state)).toBe(true);
    expect(() => {
      (state as { currentLevel: number }).currentLevel = 3;
    }).toThrow();
  });

  it('save → restore preserva sessionId y expiración', () => {
    const session = new SessionManager({ timeoutMs: 60_000 });
    session.save();

    const restored = SessionManager.restore();
    expect(restored).not.toBeNull();
    expect(restored?.getState().sessionId).toBe(session.getState().sessionId);
  });

  it('restore retorna null si la sesión guardada expiró, y la limpia', () => {
    const session = new SessionManager({ timeoutMs: 1_000 });
    session.save();
    vi.advanceTimersByTime(2_000);

    expect(SessionManager.restore()).toBeNull();
    expect(sessionStorage.getItem('vn_session')).toBeNull();
  });

  it('restore retorna null sin sesión guardada o con datos corruptos', () => {
    expect(SessionManager.restore()).toBeNull();
    sessionStorage.setItem('vn_session', '{corrupto');
    expect(SessionManager.restore()).toBeNull();
  });

  it('clear elimina la persistencia y resetea a nivel 0 con nuevo sessionId', () => {
    const session = new SessionManager();
    const oldId = session.getState().sessionId;
    session.save();
    session.clear();
    expect(sessionStorage.getItem('vn_session')).toBeNull();
    expect(session.getState().currentLevel).toBe(0);
    expect(session.getState().sessionId).not.toBe(oldId);
  });
});
