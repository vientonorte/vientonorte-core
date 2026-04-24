/**
 * @module FactorRegistry
 * Registro central de factores de autenticación (patrón Microsoft Identity).
 * Mantiene el mapa de factores verificados para la sesión activa.
 */

import type { AuthFactor, AuthLevel, FactorType } from './types';

/**
 * Registro de factores de autenticación verificados.
 * Un FactorRegistry representa lo que el usuario HA PROBADO en esta sesión,
 * no lo que podría probar.
 *
 * @example
 * const registry = new FactorRegistry();
 * registry.register({ type: 'password', level: 1, label: 'Contraseña', verifiedAt: new Date() });
 * registry.register({ type: 'totp', level: 2, label: 'Google Authenticator', verifiedAt: new Date() });
 * console.log(registry.getHighestLevel()); // 2
 */
export class FactorRegistry {
  private factors: Map<FactorType, AuthFactor> = new Map();

  /**
   * Registra un factor verificado. Si el tipo ya existe, lo sobreescribe
   * (permite re-verificación con `verifiedAt` actualizado).
   */
  register(factor: AuthFactor): void {
    this.factors.set(factor.type, factor);
  }

  /**
   * Elimina un factor del registro (p.ej. al revocar un dispositivo).
   */
  unregister(type: FactorType): void {
    this.factors.delete(type);
  }

  /**
   * Obtiene un factor específico por tipo.
   * @returns AuthFactor o undefined si no está registrado
   */
  get(type: FactorType): AuthFactor | undefined {
    return this.factors.get(type);
  }

  /**
   * Retorna todos los factores registrados ordenados por nivel descendente.
   */
  getAll(): AuthFactor[] {
    return Array.from(this.factors.values()).sort((a, b) => b.level - a.level);
  }

  /**
   * Nivel máximo de autenticación alcanzado según los factores registrados.
   * @returns AuthLevel (0 si no hay factores)
   */
  getHighestLevel(): AuthLevel {
    if (this.factors.size === 0) return 0;
    return Math.max(...Array.from(this.factors.values()).map((f) => f.level)) as AuthLevel;
  }

  /**
   * Comprueba si el registry incluye al menos un factor con el nivel indicado.
   */
  hasLevel(level: AuthLevel): boolean {
    return Array.from(this.factors.values()).some((f) => f.level >= level);
  }

  /**
   * Serializa el registry para persistencia.
   * Nota: `verifiedAt` se convierte a ISO string. No incluye datos sensibles.
   */
  toJSON(): Record<string, unknown> {
    const entries: Record<string, unknown> = {};
    for (const [type, factor] of this.factors.entries()) {
      entries[type] = {
        ...factor,
        verifiedAt: factor.verifiedAt?.toISOString(),
      };
    }
    return { factors: entries };
  }

  /**
   * Restaura un FactorRegistry desde datos serializados (p.ej. sessionStorage).
   *
   * @example
   * const raw = JSON.parse(sessionStorage.getItem('vn_registry') ?? '{}');
   * const registry = FactorRegistry.fromJSON(raw);
   */
  static fromJSON(data: Record<string, unknown>): FactorRegistry {
    const registry = new FactorRegistry();
    const factors = data['factors'] as Record<string, Record<string, unknown>> | undefined;
    if (!factors) return registry;

    for (const raw of Object.values(factors)) {
      const factor: AuthFactor = {
        type: raw['type'] as FactorType,
        level: raw['level'] as AuthLevel,
        label: raw['label'] as string,
        verifiedAt: raw['verifiedAt'] ? new Date(raw['verifiedAt'] as string) : undefined,
        deviceId: raw['deviceId'] as string | undefined,
      };
      registry.register(factor);
    }

    return registry;
  }
}
