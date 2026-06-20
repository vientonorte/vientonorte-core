import React from 'react';
import { SkipLink } from '@vientonorte/a11y';

export default function App(): React.JSX.Element {
  return (
    <>
      <SkipLink href="#main" label="Saltar al contenido principal" />
      <header role="banner" style={{ padding: 'var(--vn-space-4)', background: 'var(--vn-azul-noche)', color: 'var(--vn-marfil)' }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--vn-font-display)', fontSize: 'var(--vn-text-2xl)' }}>
          PROYECTO_NAME
        </h1>
      </header>
      <main id="main" role="main" tabIndex={-1} style={{ padding: 'var(--vn-space-6)' }}>
        <p style={{ color: 'var(--vn-color-muted)' }}>
          Proyecto scaffoldeado con{' '}
          <code style={{ fontFamily: 'var(--vn-font-mono)' }}>@vientonorte/cli</code>.
          Empieza editando <code style={{ fontFamily: 'var(--vn-font-mono)' }}>src/App.tsx</code>.
        </p>
      </main>
    </>
  );
}
