/**
 * Tests de SkipLink y useAnnouncer — WCAG 2.2 AA
 * Bypass Blocks (2.4.1) + Status Messages (4.1.3)
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { SkipLink } from './SkipLink';
import { useAnnouncer } from './useAnnouncer';

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

describe('SkipLink (2.4.1 Bypass Blocks)', () => {
  it('renderiza un link con href y label por defecto', () => {
    render(<SkipLink />);
    const link = screen.getByRole('link', { name: 'Saltar al contenido principal' });
    expect(link.getAttribute('href')).toBe('#main');
    expect(link.className).toBe('vn-skip-link');
  });

  it('acepta href y label personalizados', () => {
    render(<SkipLink href="#nav-principal" label="Saltar al menú" />);
    const link = screen.getByRole('link', { name: 'Saltar al menú' });
    expect(link.getAttribute('href')).toBe('#nav-principal');
  });
});

describe('useAnnouncer (4.1.3 Status Messages)', () => {
  it('crea un live region polite con role=status', () => {
    renderHook(() => useAnnouncer());
    const region = document.querySelector('[role="status"]');
    expect(region).not.toBeNull();
    expect(region?.getAttribute('aria-live')).toBe('polite');
    expect(region?.getAttribute('aria-atomic')).toBe('true');
  });

  it('announce() inyecta el mensaje tras el delay de re-anuncio', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useAnnouncer());

    act(() => {
      result.current.announce('Cambios guardados');
      vi.advanceTimersByTime(100);
    });

    const region = document.querySelector('[role="status"]');
    expect(region?.textContent).toBe('Cambios guardados');
    vi.useRealTimers();
  });

  it('elimina el live region al desmontar', () => {
    const { unmount } = renderHook(() => useAnnouncer());
    expect(document.querySelector('[role="status"]')).not.toBeNull();
    unmount();
    expect(document.querySelector('[role="status"]')).toBeNull();
  });
});
