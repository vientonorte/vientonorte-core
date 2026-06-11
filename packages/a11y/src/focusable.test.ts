/**
 * Tests de focusable.ts — getFocusableElements / isFocusable
 * WCAG 2.2 AA — Focus Order (2.4.3)
 */
import { afterEach, describe, expect, it } from 'vitest';
import { getFocusableElements, isFocusable } from './focusable';

function render(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('getFocusableElements', () => {
  it('retorna elementos nativamente focusables en orden DOM', () => {
    const container = render(`
      <a href="/inicio">link</a>
      <button>botón</button>
      <input type="text" />
      <select><option>1</option></select>
      <textarea></textarea>
    `);
    const tags = getFocusableElements(container).map((el) => el.tagName);
    expect(tags).toEqual(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);
  });

  it('excluye elementos disabled, hidden, aria-hidden e inert', () => {
    const container = render(`
      <button disabled>disabled</button>
      <button hidden>hidden</button>
      <button aria-hidden="true">aria-hidden</button>
      <div inert><button>dentro de inert</button></div>
      <button id="ok">focusable</button>
    `);
    const result = getFocusableElements(container);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('ok');
  });

  it('excluye anchors sin href y tabindex=-1', () => {
    const container = render(`
      <a>sin href</a>
      <button tabindex="-1">fuera del orden de tab</button>
      <div tabindex="0" id="ok">div focusable</div>
    `);
    const result = getFocusableElements(container);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('ok');
  });
});

describe('isFocusable', () => {
  it('acepta un botón visible y habilitado', () => {
    const container = render('<button>ok</button>');
    expect(isFocusable(container.querySelector('button')!)).toBe(true);
  });

  it('rechaza elementos con display:none', () => {
    const container = render('<button style="display:none">oculto</button>');
    expect(isFocusable(container.querySelector('button')!)).toBe(false);
  });

  it('rechaza inputs disabled', () => {
    const container = render('<input disabled />');
    expect(isFocusable(container.querySelector('input')!)).toBe(false);
  });
});
