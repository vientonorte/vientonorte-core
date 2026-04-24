/**
 * @module types
 * Tipos base para el sistema de autenticación multi-factor del colectivo vientonorte.
 * Diseñado con modelo STRIDE (Spoofing, Tampering, Repudiation, Info disclosure,
 * Denial of service, Elevation of privilege).
 */

/** Tipos de factor de autenticación soportados */
export type FactorType =
  | 'password'
  | 'otp-sms'
  | 'otp-email'
  | 'totp'
  | 'passkey'
  | 'magic-link';

/**
 * Nivel de autenticación alcanzado en la sesión.
 * 0 = anónimo
 * 1 = contraseña válida
 * 2 = segundo factor (OTP / TOTP / magic-link)
 * 3 = factor de hardware (passkey / WebAuthn)
 */
export type AuthLevel = 0 | 1 | 2 | 3;

/** Representa un factor de autenticación registrado y verificado */
export interface AuthFactor {
  type: FactorType;
  level: AuthLevel;
  /** Etiqueta legible para UI (p.ej. "Teléfono terminado en 4821") */
  label: string;
  /** Cuándo fue verificado por última vez */
  verifiedAt?: Date;
  /** ID de dispositivo (hash, sin PII) para correlacionar sesiones */
  deviceId?: string;
}

/** Estado completo de la sesión autenticada */
export interface SessionState {
  userId: string | null;
  factors: AuthFactor[];
  currentLevel: AuthLevel;
  sessionId: string;
  expiresAt: Date;
  lastActivityAt: Date;
}

/** Requisito de nivel mínimo para una operación sensible */
export interface FactorRequirement {
  minLevel: AuthLevel;
  /** Descripción legible del motivo (para UI de step-up) */
  reason: string;
  /** Si se especifica, solo estos tipos de factor son aceptables */
  allowedFactors?: FactorType[];
}

/** Resultado de un intento de step-up auth */
export type StepUpResult =
  | { success: true; newLevel: AuthLevel }
  | {
      success: false;
      required: FactorRequirement;
      currentLevel: AuthLevel;
    };
