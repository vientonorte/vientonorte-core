#!/usr/bin/env node
// Build script para @vientonorte/tokens
// src/ → dist/ (sin transpilación — CSS y JS puro)

import { cpSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

mkdirSync(join(root, 'dist'), { recursive: true });
cpSync(join(root, 'src', 'tokens.css'),          join(root, 'dist', 'tokens.css'));
cpSync(join(root, 'src', 'tailwind-preset.js'),  join(root, 'dist', 'tailwind-preset.js'));

console.log('✅ @vientonorte/tokens built → dist/');
