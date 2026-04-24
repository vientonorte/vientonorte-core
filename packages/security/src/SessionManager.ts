/**
 * @module SessionManager
 * Gestión de sesión autenticada con timeout de inactividad y step-up auth.
 *
 * Almacena en sessionStorage (no localStorage) para limitar el scope a la
 * pestaña activa — decisión de seguridad: reduce superficie de ataque XSS.
 */

import type { SessionState, FactorRequirement, AuthLevel, StepUpResult } from './types';
import type { FactorRegistry } from './FactorRegistry';

const STORAGE_KEY = 'vn_session';
const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutos

/**
 * Gestiona el estado de sesión autenticada.
 *
 * @example
 * const session = new SessionManager({ timeoutMs: 15 * 60 * 1000 });
 * session.updateActivity();
 *
 * const result = session.requireLevel(
 *   { minLevel: 2, reason: 'Operación de retiro requiere 2FA' },
 *   registry
 * );
 * if (!result.success) showStepUpDialog(result.required);
 */
export class SessionManager {
  private state: SessionState;
  private readonly timeoutMs: number;

  constructor(options?: { timeoutMs?: number }) {
    this.timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const now = new Date();
    this.state = {
      userId: null,
      factors: [],
      currentLevel: 0,
      sessionId: this.generateSessionId(),
      expiresAt: new Date(now.getTime() + this.timeoutMs),
      lastActivityAt: now,
    };
  }

  /** Retorna una copia readonly del estado actual */
  getState(): Readonly<SessionState> {
    return Object.freeze({ ...this.state, factors: [...this.state.factors] });
  }

  /**
   * Actualiza el timestamp de última actividad y extiende la expiración.
   * Llamar en cada interacción del usuario (click, navegación, API call).
   */
  updateActivity(): void {
    const now = new Date();
    this.state.lastActivityAt = now;
    this.state.expiresAt = new Date(now.getTime() + this.timeoutMs);
  }

  /**
   * Comprueba si la sesión ha expirado por inactividad.
   */
  isExpired(): boolean {
    return new Date() > this.state.expiresAt;
  }

  /**
   * Verifica si el registry satisface el requisito de nivel.
   * Si no, retorna `success: false` con los datos para mostrar el diálogo de step-up.
   *
   * @param requirement - Nivel mínimo y motivo requerido
   * @param registry - FactorRegistry con los factores verificados en sesión
   * @returns StepUpResult
   *
   * @example
   * const result = session.requireLevel(
   *   { minLevel: 2, reason: 'Ver número de cuenta completo' },
   *   registry
   * );
   * if (result.success) proceedWithSensitiveOp();
   * else showStepUpPrompt(result.required);
   */
  requireLevel(
    requirement: FactorRequirement,
    registry: FactorRegistry
  ): StepUpResult {
    if (this.isExpired()) {
      return {
        success: false,
        required: { minLevel: 1, reason: 'Sesión expirada. Por favor inicia sesión nuevamente.' },
        currentLevel: 0,
      };
    }

    const currentLevel = registry.getHighestLevel();
    this.state.currentLevel = currentLevel;

    if (currentLevel < requirement.minLevel) {
      return {
        success: false,
        required: requirement,
        currentLevel,
      };
    }

    // Si hay restricción de tipos de factor, verificar
    if (requirement.allowedFactors && requirement.allowedFactors.length > 0) {
      const hasAllowedFactor = requirement.allowedFactors.some(
        (type) => registry.get(type) !== undefined
      );
      if (!hasAllowedFactor) {
        return {
          success: false,
          required: requirement,
          currentLevel,
        };
      }
    }

    this.updateActivity();
    return { success: true, newLevel: currentLevel };
  }

  /**
   * Genera un device fingerprint básico sin PII.
   * Solo para correlacionar sesiones del mismo dispositivo, no para tracking.
   */
  private generateDeviceId(): string {
    if (typeof window === 'undefined') return 'server';

    const raw = [
      navigator.userAgent,
      screen.width,
      screen.height,
      screen.colorDepth,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ].join('|');

    // djb2 hash (rápido, suficiente para fingerprint no-PII)
    let hash = 5381;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) + hash + raw.charCodeAt(i);
      hash = hash & hash; // convert to 32-bit int
    }
    return Math.abs(hash).toString(36);
  }

  /** Genera un sessionId único */
  private generateSessionId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback para entornos sin crypto.randomUUID
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }

  /**
   * Persiste el estado en sessionStorage (no localStorage — decisión de seguridad).
   * No persiste datos sensibles como tokens o contraseñas.
   */
  save(): void {
    if (typeof sessionStorage === 'undefined') return;
    try {
      const data = {
        ...this.state,
        expiresAt: this.state.expiresAt.toISOString(),
        lastActivityAt: this.state.lastActivityAt.toISOString(),
        factors: this.state.factors.map((f) => ({
          ...f,
          verifiedAt: f.verifiedAt?.toISOString(),
        })),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // sessionStorage puede lanzar en modo privado con cuota llena — ignorar silenciosamente
    }
  }

  /**
   * Restaura una sesión desde sessionStorage.
   * Retorna null si no hay sesión guardada o está expirada.
   *
   * @example
   * const session = SessionManager.restore() ?? new SessionManager();
   */
  static restore(): SessionManager | null {
    if (typeof sessionStorage === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const data = JSON.parse(raw) as Record<string, unknown>;
      const manager = new SessionManager();

      manager.state = {
        userId: data['userId'] as string | null,
        factors: (data['factors'] as Array<Record<string, unknown>>).map((f) => ({
          type: f['type'] as import('./types').FactorType,
          level: f['level'] as AuthLevel,
          label: f['label'] as string,
          verifiedAt: f['verifiedAt'] ? new Date(f['verifiedAt'] as string) : undefined,
          deviceId: f['deviceId'] as string | undefined,
        })),
        currentLevel: data['currentLevel'] as AuthLevel,
        sessionId: data['sessionId'] as string,
        expiresAt: new Date(data['expiresAt'] as string),
        lastActivityAt: new Date(data['lastActivityAt'] as string),
      };

      if (manager.isExpired()) {
        manager.clear();
        return null;
      }

      return manager;
    } catch {
      return null;
    }
  }

  /**
   * Limpia la sesión de sessionStorage y resetea el estado.
   */
  clear(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    const now = new Date();
    this.state = {
      userId: null,
      factors: [],
      currentLevel: 0,
      sessionId: this.generateSessionId(),
      expiresAt: new Date(now.getTime() + this.timeoutMs),
      lastActivityAt: now,
    };
  }
}
