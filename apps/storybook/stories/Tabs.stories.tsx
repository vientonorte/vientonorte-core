import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@vientonorte/ui';

const meta: Meta = {
  title: 'Molecules/Tabs',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Tabs defaultValue="resumen" style={{ width: '400px' }}>
      <TabsList>
        <TabsTrigger value="resumen">Resumen</TabsTrigger>
        <TabsTrigger value="detalle">Detalle</TabsTrigger>
        <TabsTrigger value="historial">Historial</TabsTrigger>
      </TabsList>
      <TabsContent value="resumen">
        <p style={{ margin: '16px 0', color: 'var(--vn-color-muted)', fontSize: '14px' }}>
          Vista resumen del período seleccionado.
        </p>
      </TabsContent>
      <TabsContent value="detalle">
        <p style={{ margin: '16px 0', color: 'var(--vn-color-muted)', fontSize: '14px' }}>
          Información detallada por categoría.
        </p>
      </TabsContent>
      <TabsContent value="historial">
        <p style={{ margin: '16px 0', color: 'var(--vn-color-muted)', fontSize: '14px' }}>
          Registro histórico completo.
        </p>
      </TabsContent>
    </Tabs>
  ),
};
