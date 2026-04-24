/**
 * @vientonorte/security — Factor Registry + step-up auth
 *
 * Exports:
 * - Types: FactorType, AuthLevel, AuthFactor, SessionState, FactorRequirement, StepUpResult
 * - FactorRegistry — registro central de factores verificados
 * - SessionManager — gestión de sesión con timeout e step-up
 * - requireFactor  — helper funcional para step-up sin instanciar clase
 * - buildCSP / injectCSPMeta / vientonorteCSP — Content Security Policy helpers
 */

export type {
  FactorType,
  AuthLevel,
  AuthFactor,
  SessionState,
  FactorRequirement,
  StepUpResult,
} from './types';

export { FactorRegistry } from './FactorRegistry';
export { SessionManager } from './SessionManager';
export { requireFactor } from './requireFactor';
export { buildCSP, injectCSPMeta, vientonorteCSP } from './cspHeaders';
export type { CSPConfig } from './cspHeaders';
