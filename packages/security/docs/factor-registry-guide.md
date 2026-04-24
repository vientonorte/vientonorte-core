# Factor Registry — Guía de integración

> `@vientonorte/security` — v0.1.0

## Conceptos clave

| Concepto | Descripción |
|---|---|
| **FactorRegistry** | Mapa de factores verificados en la sesión actual |
| **SessionManager** | Gestiona timeout, expiración y step-up |
| **AuthLevel** | 0=anónimo, 1=password, 2=2FA, 3=passkey/hardware |
| **StepUpResult** | `success: true` o `{ required, currentLevel }` para mostrar UI |

---

## Instalación

```ts
// En tsconfig.json del proyecto (p.ej. dashfin):
// paths: { "@vientonorte/security": ["../vientonorte-core/packages/security/src"] }
import { FactorRegistry, SessionManager, requireFactor } from '@vientonorte/security';
```

---

## 1. Inicializar registro y sesión

```ts
import { FactorRegistry, SessionManager } from '@vientonorte/security';

// Crear instancias (una vez por sesión de usuario)
const registry = new FactorRegistry();
const session = new SessionManager({ timeoutMs: 30 * 60 * 1000 }); // 30 min

// O restaurar desde sessionStorage si existe sesión previa:
const session = SessionManager.restore() ?? new SessionManager();
```

---

## 2. Registrar factores tras verificación con Supabase

```ts
import { createClient } from '@supabase/supabase-js';
import { FactorRegistry } from '@vientonorte/security';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loginWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) throw error;

  // Registrar factor password (nivel 1)
  registry.register({
    type: 'password',
    level: 1,
    label: 'Contraseña',
    verifiedAt: new Date(),
  });

  session.updateActivity();
  session.save();
  return data.user;
}

async function verifyTOTP(code: string) {
  // Supabase MFA verify:
  const { data, error } = await supabase.auth.mfa.verify({
    factorId: 'totp-factor-id', // obtener de listFactors()
    challengeId: 'challenge-id',
    code,
  });
  if (error) throw error;

  // Registrar factor TOTP (nivel 2)
  registry.register({
    type: 'totp',
    level: 2,
    label: 'Aplicación autenticadora',
    verifiedAt: new Date(),
  });

  session.updateActivity();
  session.save();
}

async function verifyPasskey() {
  // WebAuthn / Supabase passkey flow
  const { data, error } = await supabase.auth.signInWithPasskey();
  if (error) throw error;

  registry.register({
    type: 'passkey',
    level: 3,
    label: 'Passkey del dispositivo',
    verifiedAt: new Date(),
  });

  session.updateActivity();
  session.save();
}
```

---

## 3. Step-up auth antes de operaciones sensibles

### Patrón básico

```ts
import { requireFactor } from '@vientonorte/security';

async function transferFunds(amount: number, destination: string) {
  // Exigir nivel 2 (2FA) para transferencias
  const result = requireFactor(2, 'Las transferencias requieren verificación en dos pasos', registry, session);

  if (!result.success) {
    // Mostrar diálogo de step-up con el motivo
    showStepUpDialog({
      reason: result.required.reason,
      currentLevel: result.currentLevel,
      requiredLevel: result.required.minLevel,
    });
    return;
  }

  // Proceder con la operación
  await api.transfer(amount, destination);
}
```

### Con factores específicos requeridos (passkey para retiros grandes)

```ts
async function largWithdrawal(amount: number) {
  const result = session.requireLevel(
    {
      minLevel: 3,
      reason: 'Retiros sobre $1.000.000 requieren passkey o llave de hardware',
      allowedFactors: ['passkey'],
    },
    registry
  );

  if (!result.success) {
    showPasskeyPrompt(result.required);
    return;
  }

  await api.withdraw(amount);
}
```

---

## 4. Integración con React (dashfin)

```tsx
import { createContext, useContext, useState } from 'react';
import { FactorRegistry, SessionManager } from '@vientonorte/security';

interface AuthCtx {
  registry: FactorRegistry;
  session: SessionManager;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [registry] = useState(() => new FactorRegistry());
  const [session] = useState(() => SessionManager.restore() ?? new SessionManager());

  return (
    <AuthContext.Provider value={{ registry, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}

// En un componente que requiere step-up:
function SensitiveAction() {
  const { registry, session } = useAuth();
  const [showStepUp, setShowStepUp] = useState(false);

  const handleAction = () => {
    const result = requireFactor(2, 'Ver datos completos', registry, session);
    if (result.success) {
      doSensitiveAction();
    } else {
      setShowStepUp(true);
    }
  };

  return (
    <>
      <button onClick={handleAction}>Ver datos completos</button>
      {showStepUp && <StepUpDialog onClose={() => setShowStepUp(false)} />}
    </>
  );
}
```

---

## 5. CSP para GitHub Pages

```ts
import { injectCSPMeta, vientonorteCSP } from '@vientonorte/security';

// En el entry point (main.tsx), antes de ReactDOM.createRoot:
injectCSPMeta({
  ...vientonorteCSP,
  connectSrc: [
    ...vientonorteCSP.connectSrc!,
    'https://tu-proyecto.supabase.co', // URL real de Supabase
    'https://api.tu-servicio.com',
  ],
});
```

---

## Notas de seguridad (STRIDE)

- **Spoofing**: El registry no verifica la identidad por sí mismo — delega en Supabase Auth. Solo registrar factores tras verificación exitosa del proveedor.
- **Tampering**: `SessionManager` usa `sessionStorage` (no `localStorage`) para limitar scope a pestaña. Los datos no son cifrados — no guardar tokens de acceso aquí.
- **Repudiation**: `verifiedAt` en cada factor permite trazar cuándo se verificó.
- **Info disclosure**: `toJSON()` en FactorRegistry excluye cualquier credencial. El `deviceId` es un hash sin PII (userAgent + dimensiones de pantalla + timezone).
- **DoS**: El timeout de 30 min por inactividad limita ventana de ataque en dispositivos compartidos.
- **Elevation of privilege**: `requireFactor` / `requireLevel` deben llamarse en el servidor (o como validación de doble check) para operaciones realmente sensibles. El check en cliente es UX, no seguridad.
