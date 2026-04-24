#!/usr/bin/env node
/**
 * @vientonorte/cli — Scaffold para proyectos del colectivo vientonorte
 *
 * Uso:
 *   npx @vientonorte/cli init mi-nuevo-proyecto
 *   npx @vientonorte/cli init mi-nuevo-proyecto --template=react-ts
 *   npx @vientonorte/cli init mi-nuevo-proyecto --template=vanilla --with-auth
 */

import { createProject } from './createProject';
import type { ProjectOptions } from './createProject';

// ─── Banner ─────────────────────────────────────────────────────────────────

const BANNER = `
  ╦  ╦╦╔═╗╔╗╔╔╦╗╔═╗╔╗╔╔═╗╦═╗╔╦╗╔═╗
  ╚╗╔╝║║╣ ║║║ ║ ║ ║║║║║ ║╠╦╝ ║ ║╣
   ╚╝ ╩╚═╝╝╚╝ ╩ ╚═╝╝╚╝╚═╝╩╚═ ╩ ╚═╝
  CLI — colectivo vientonorte v0.1.0
`;

// ─── Arg parsing ─────────────────────────────────────────────────────────────

function parseArgs(): { command: string; name: string; options: Partial<ProjectOptions> } | null {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return null;
  }

  if (command !== 'init') {
    console.error(`\n  Error: comando desconocido "${command}". Usa "init".\n`);
    printHelp();
    process.exit(1);
  }

  const name = args[1];
  if (!name) {
    console.error('\n  Error: falta el nombre del proyecto.\n  Uso: vientonorte init <nombre>\n');
    process.exit(1);
  }

  // Validar nombre (sin espacios, solo letras, números y guiones)
  if (!/^[a-z0-9-]+$/.test(name)) {
    console.error('\n  Error: el nombre solo puede contener letras minúsculas, números y guiones.\n');
    process.exit(1);
  }

  const flags = args.slice(2);
  const templateFlag = flags.find((f) => f.startsWith('--template='));
  const template = (templateFlag?.split('=')[1] ?? 'react-ts') as ProjectOptions['template'];

  if (!['vanilla', 'react', 'react-ts'].includes(template)) {
    console.error(`\n  Error: template inválido "${template}". Opciones: vanilla, react, react-ts\n`);
    process.exit(1);
  }

  return {
    command,
    name,
    options: {
      template,
      withAuth: flags.includes('--with-auth'),
      withAnalytics: flags.includes('--with-analytics'),
    },
  };
}

function printHelp(): void {
  console.log(BANNER);
  console.log('  Uso:');
  console.log('    vientonorte init <nombre> [opciones]\n');
  console.log('  Opciones:');
  console.log('    --template=<vanilla|react|react-ts>  Template base (default: react-ts)');
  console.log('    --with-auth                          Incluye @vientonorte/security');
  console.log('    --with-analytics                     Incluye @vientonorte/analytics\n');
  console.log('  Ejemplos:');
  console.log('    vientonorte init mi-portafolio --template=react-ts');
  console.log('    vientonorte init dashfin --template=react-ts --with-auth --with-analytics');
  console.log('    vientonorte init tabla-simple --template=vanilla\n');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log(BANNER);

  const parsed = parseArgs();
  if (!parsed) return;

  const { name, options } = parsed;

  await createProject({
    name,
    template: options.template ?? 'react-ts',
    withAuth: options.withAuth ?? false,
    withAnalytics: options.withAnalytics ?? false,
  });
}

main().catch((err: Error) => {
  console.error(`\n  Error: ${err.message}\n`);
  process.exit(1);
});

export { createProject };
export type { ProjectOptions };
