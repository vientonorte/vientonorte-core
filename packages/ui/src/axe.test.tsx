/**
 * Gate de accesibilidad — axe-core sobre cada componente del design system.
 * Definition of Done: "Axe-core sin violaciones AA (falla CI si hay)".
 *
 * Limitación de jsdom: la regla color-contrast requiere render real
 * (canvas/layout) y se desactiva aquí. El contraste de la paleta está
 * verificado por cálculo en @vientonorte/tokens (ver CHANGELOG 0.2.0).
 */
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import axe from 'axe-core';
import React from 'react';

import {
  Alert, AlertDescription, AlertTitle,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
  Badge, Button,
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Checkbox, Dialog, Input, Label, Progress,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Separator, Skeleton, SkipLink, Switch,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Textarea, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from './index';

async function expectNoViolations(ui: React.ReactElement): Promise<void> {
  const { container } = render(ui);
  const results = await axe.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    rules: { 'color-contrast': { enabled: false } }, // sin layout real en jsdom
  });
  const resumen = results.violations.map(
    (v) => `${v.id}: ${v.help} → ${v.nodes.map((n) => n.html).join(' | ')}`
  );
  expect(resumen).toEqual([]);
}

afterEach(cleanup);

describe('axe-core — atoms', () => {
  it('Button', () => expectNoViolations(<Button>Guardar</Button>));
  it('Input (default + error)', () =>
    expectNoViolations(
      <>
        <Input label="Nombre" hint="Como aparece en tu documento" />
        <Input label="Correo" error="Correo inválido" />
      </>
    ));
  it('Badge', () => expectNoViolations(<Badge>Nuevo</Badge>));
  it('Label + control asociado', () =>
    expectNoViolations(
      <>
        <Label htmlFor="campo-ciudad">Ciudad</Label>
        <input id="campo-ciudad" type="text" />
      </>
    ));
  it('Skeleton', () => expectNoViolations(<Skeleton width={120} height={16} />));
  it('SkipLink', () =>
    expectNoViolations(
      <>
        <SkipLink href="#main" />
        <main id="main">Contenido</main>
      </>
    ));
  it('Textarea (default + error)', () =>
    expectNoViolations(
      <>
        <Textarea label="Mensaje" />
        <Textarea label="Notas" error="Requerido" />
      </>
    ));
  it('Select', () =>
    expectNoViolations(
      <Select defaultValue="a">
        <SelectTrigger aria-label="Región">
          <SelectValue placeholder="Elige una región" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Antofagasta</SelectItem>
          <SelectItem value="b">Biobío</SelectItem>
        </SelectContent>
      </Select>
    ));
  it('Switch', () => expectNoViolations(<Switch label="Notificaciones" />));
  it('Checkbox', () => expectNoViolations(<Checkbox label="Acepto los términos" />));
  it('Progress', () => expectNoViolations(<Progress value={40} aria-label="Progreso de carga" />));
});

describe('axe-core — molecules', () => {
  it('Card', () =>
    expectNoViolations(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
          <CardDescription>Descripción breve</CardDescription>
        </CardHeader>
        <CardContent>Contenido</CardContent>
        <CardFooter>Pie</CardFooter>
      </Card>
    ));
  it('Alert', () =>
    expectNoViolations(
      <Alert>
        <AlertTitle>Atención</AlertTitle>
        <AlertDescription>Hay cambios sin guardar.</AlertDescription>
      </Alert>
    ));
  it('Tabs', () =>
    expectNoViolations(
      <Tabs defaultValue="uno">
        <TabsList aria-label="Secciones">
          <TabsTrigger value="uno">Uno</TabsTrigger>
          <TabsTrigger value="dos">Dos</TabsTrigger>
        </TabsList>
        <TabsContent value="uno">Panel uno</TabsContent>
        <TabsContent value="dos">Panel dos</TabsContent>
      </Tabs>
    ));
  it('Dialog (abierto)', () =>
    expectNoViolations(
      <Dialog open onClose={() => {}} title="Confirmar acción" description="Esta acción es reversible.">
        <Button>Aceptar</Button>
      </Dialog>
    ));
  it('Tooltip (trigger)', () =>
    expectNoViolations(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button>Más info</Button>
          </TooltipTrigger>
          <TooltipContent>Detalle adicional</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ));
  it('Separator', () => expectNoViolations(<Separator />));
  it('Table', () =>
    expectNoViolations(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proyecto</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>table-ro</TableCell>
            <TableCell>LIVE</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ));
  it('AlertDialog (abierto)', () =>
    expectNoViolations(
      <AlertDialog open onOpenChange={() => {}}>
        <AlertDialogTrigger>
          <Button>Eliminar</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar registro?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ));
});
