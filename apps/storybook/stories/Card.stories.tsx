import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from '@vientonorte/ui';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: '320px' }}>
      <CardHeader>
        <CardTitle>Título de tarjeta</CardTitle>
        <CardDescription>Descripción breve del contenido de esta tarjeta.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--vn-color-muted)' }}>
          Contenido principal de la tarjeta. Puede incluir texto, imágenes u otros componentes.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card style={{ width: '320px' }}>
      <CardHeader>
        <CardTitle>KPI Mensual</CardTitle>
        <CardDescription>Rendimiento vs. objetivo</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--vn-color-on-surface)' }}>
          87%
        </div>
        <Badge variant="warning">-3% vs mes anterior</Badge>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">Ver detalle</Button>
      </CardFooter>
    </Card>
  ),
};
