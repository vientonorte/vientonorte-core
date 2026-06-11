/**
 * Tests de createFocusTrap — WCAG 2.2 AA Focus Order (2.4.3)
 * El ciclo Tab/Shift+Tab y la restauración de foco son el contrato del trap.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createFocusTrap } from './useFocusTrap';

let outside: HTMLButtonElement;
let modal: HTMLDivElement;
let first: HTMLButtonElement;
let last: HTMLButtonElement;

function pressTab(shiftKey = false): void {
  document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true })
  );
}

beforeEach(() => {
  document.body.innerHTML = `
    <button id="outside">fuera</button>
    <div id="modal">
      <button id="first">primero</button>
      <input id="middle" />
      <button id="last">último</button>
    </div>
  `;
  outside = document.getElementById('outside') as HTMLButtonElement;
  modal = document.getElementById('modal') as HTMLDivElement;
  first = document.getElementById('first') as HTMLButtonElement;
  last = document.getElementById('last') as HTMLButtonElement;
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('createFocusTrap', () => {
  it('al activar mueve el foco al primer elemento focusable', () => {
    outside.focus();
    createFocusTrap(modal).activate();
    expect(document.activeElement).toBe(first);
  });

  it('Tab desde el último elemento cicla al primero', () => {
    const trap = createFocusTrap(modal);
    trap.activate();
    last.focus();
    pressTab();
    expect(document.activeElement).toBe(first);
  });

  it('Shift+Tab desde el primer elemento cicla al último', () => {
    const trap = createFocusTrap(modal);
    trap.activate();
    first.focus();
    pressTab(true);
    expect(document.activeElement).toBe(last);
  });

  it('al desactivar restaura el foco al elemento previo (2.4.3)', () => {
    outside.focus();
    const trap = createFocusTrap(modal);
    trap.activate();
    expect(document.activeElement).not.toBe(outside);
    trap.deactivate();
    expect(document.activeElement).toBe(outside);
  });

  it('después de desactivar, Tab ya no es interceptado', () => {
    const trap = createFocusTrap(modal);
    trap.activate();
    trap.deactivate();
    outside.focus();
    pressTab();
    expect(document.activeElement).toBe(outside);
  });
});
