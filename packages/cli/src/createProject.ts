/**
 * @module createProject
 * Lógica principal de scaffolding para nuevos proyectos vientonorte.
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, cpSync } from 'fs';
import { join, resolve } from 'path';

export interface ProjectOptions {
  name: string;
  template: 'vanilla' | 'react' | 'react-ts';
  withAuth: boolean;
  withAnalytics: boolean;
}

/**
 * Crea la estructura de un nuevo proyecto vientonorte.
 *
 * Pasos:
 * 1. Crea directorio del proyecto
 * 2. Copia template base
 * 3. Personaliza package.json con el nombre del proyecto
 * 4. Copia CLAUDE.md con placeholders reemplazados
 * 5. Crea .github/workflows/ci.yml
 * 6. git init + primer commit
 * 7. Muestra next steps
 *
 * @example
 * await createProject({ name: 'mi-proyecto', template: 'react-ts', withAuth: true, withAnalytics: false });
 */
export async function createProject(options: ProjectOptions): Promise<void> {
  const { name, template, withAuth, withAnalytics } = options;
  const targetDir = resolve(process.cwd(), name);

  console.log(`\n  Creando proyecto: ${name}`);
  console.log(`  Template: ${template}`);
  console.log(`  Auth: ${withAuth ? 'sí' : 'no'} | Analytics: ${withAnalytics ? 'sí' : 'no'}\n`);

  // 1. Crear directorio
  if (existsSync(targetDir)) {
    throw new Error(`El directorio "${name}" ya existe. Elige otro nombre.`);
  }
  mkdirSync(targetDir, { recursive: true });

  // 2. Copiar template base
  const templateDir = join(__dirname, '..', 'templates', 'base');
  if (existsSync(templateDir)) {
    cpSync(templateDir, targetDir, { recursive: true });
  }

  // 3. Personalizar package.json
  const pkgPath = join(targetDir, 'package.json');
  const pkgContent = existsSync(pkgPath)
    ? JSON.parse(readFileSync(pkgPath, 'utf-8'))
    : {};

  const deps: Record<string, string> = {
    '@vientonorte/tokens': '^0.1.0',
  };

  if (withAuth) deps['@vientonorte/security'] = '^0.1.0';
  if (withAnalytics) deps['@vientonorte/analytics'] = '^0.1.0';

  const finalPkg = {
    ...pkgContent,
    name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: template === 'vanilla' ? 'npx serve .' : 'vite',
      build: template === 'vanilla' ? 'echo "No build step for vanilla"' : 'vite build',
      preview: template === 'vanilla' ? 'npx serve .' : 'vite preview',
      lint: 'eslint src --ext .ts,.tsx',
      typecheck: 'tsc --noEmit',
      test: 'vitest run',
      ...pkgContent.scripts,
    },
    dependencies: { ...pkgContent.dependencies, ...deps },
    devDependencies: {
      typescript: '^5.4.0',
      ...(template !== 'vanilla' ? { vite: '^5.0.0', react: '^18.0.0', 'react-dom': '^18.0.0' } : {}),
      ...pkgContent.devDependencies,
    },
  };

  writeFileSync(pkgPath, JSON.stringify(finalPkg, null, 2) + '\n');

  // 4. Crear/personalizar CLAUDE.md
  const claudeMdTemplate = join(templateDir, 'CLAUDE.md');
  const claudeMdTarget = join(targetDir, 'CLAUDE.md');
  if (existsSync(claudeMdTemplate)) {
    const content = readFileSync(claudeMdTemplate, 'utf-8')
      .replace(/PROYECTO_NAME/g, name)
      .replace(/PROYECTO_TEMPLATE/g, template);
    writeFileSync(claudeMdTarget, content);
  } else {
    writeFileSync(claudeMdTarget, generateClaudeMd(name, template));
  }

  // 5. Crear .github/workflows/ci.yml
  const workflowsDir = join(targetDir, '.github', 'workflows');
  mkdirSync(workflowsDir, { recursive: true });
  const ciTemplate = join(templateDir, '.github', 'workflows', 'ci.yml');
  const ciTarget = join(workflowsDir, 'ci.yml');
  if (existsSync(ciTemplate)) {
    writeFileSync(ciTarget, readFileSync(ciTemplate, 'utf-8'));
  } else {
    writeFileSync(ciTarget, generateCIYml());
  }

  // 6. git init + primer commit
  try {
    execSync('git init', { cwd: targetDir, stdio: 'pipe' });
    writeFileSync(join(targetDir, '.gitignore'), generateGitignore());
    execSync('git add -A', { cwd: targetDir, stdio: 'pipe' });
    execSync(
      'git commit -m "chore: scaffold inicial — vientonorte CLI"',
      { cwd: targetDir, stdio: 'pipe' }
    );
    console.log('  ✓ Git inicializado con commit inicial');
  } catch {
    console.log('  ! Git init falló — puedes inicializarlo manualmente');
  }

  // 7. Next steps
  console.log('\n  ─────────────────────────────────────────');
  console.log(`  Proyecto "${name}" creado en ./${name}/\n`);
  console.log('  Próximos pasos:');
  console.log(`    cd ${name}`);
  console.log('    npm install   # o pnpm install');
  console.log('    npm run dev\n');
  if (withAuth) {
    console.log('  Auth:');
    console.log('    Configura SUPABASE_URL y SUPABASE_ANON_KEY en .env.local');
    console.log('    Ver: packages/security/docs/factor-registry-guide.md\n');
  }
  console.log('  Docs: https://github.com/vientonorte/vientonorte-core\n');
}

/** Genera un CLAUDE.md básico si no existe el template */
function generateClaudeMd(name: string, template: string): string {
  return `# CLAUDE.md — ${name}

> Auto-contenido. Pegar al inicio de cada sesión en este repo.

## Proyecto
**${name}** — template: ${template}
Parte del colectivo vientonorte.

## Stack
- @vientonorte/tokens (design tokens)
- TypeScript strict
- pnpm

## Reglas
1. WCAG 2.2 AA mínimo
2. Mobile-first desde 360px
3. Commits: Conventional Commits
4. Sin lógica de negocio en @vientonorte/core

## Paleta vientonorte
Ver: @vientonorte/tokens
`;
}

/** Genera el CI yaml si no existe el template */
function generateCIYml(): string {
  return `name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint || true
      - run: npm run typecheck || true
      - run: npm run build
      - run: npm test || true
`;
}

/** Genera .gitignore básico */
function generateGitignore(): string {
  return `node_modules/
dist/
.env
.env.local
.env.*.local
.DS_Store
*.log
`;
}
