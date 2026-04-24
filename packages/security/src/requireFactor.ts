/**
 * @module requireFactor
 * Helper funcional (sin clase) para step-up auth.
 * API alternativa a SessionManager.requireLevel() para uso en middleware
 * o funciones de servidor donde no se quiere instanciar la clase completa.
 */

import type { AuthLevel, FactorRequirement, StepUpResult } from './types';
import type { FactorRegistry } from './FactorRegistry';
import type { SessionManager } from './SessionManager';

/**
 * Verifica que la sesión tenga el nivel requerido para una operación sensible.
 * Wrapper funcional sobre SessionManager.requireLevel().
 *
 * @param level - Nivel mínimo de autenticación requerido
 * @param reason - Motivo legible para mostrar al usuario en el diálogo de step-up
 * @param registry - FactorRegistry con los factores verificados
 * @param session - SessionManager de la sesión activa
 * @returns StepUpResult — éxito o datos para mostrar step-up UI
 *
 * @example
 * // Antes de mostrar número de cuenta completo:
 * const result = requireFactor(2, 'Ver datos sensibles', registry, session);
 * if (!result.success) {
 *   showStepUpDialog(result.required);
 *   return;
 * }
 * revealAccountNumber();
 *
 * @example
 * // Solo passkey para transferencias:
 * const result = requireFactor(
 *   3,
 *   'Transferir fondos requiere passkey',
 *   registry,
 *   session
 * );
 */
export function requireFactor(
  level: AuthLevel,
  reason: string,
  registry: FactorRegistry,
  session: SessionManager
): StepUpResult {
  const requirement: FactorRequirement = { minLevel: level, reason };
  return session.requireLevel(requirement, registry);
}
