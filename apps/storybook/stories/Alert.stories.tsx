import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from '@vientonorte/ui';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  render: () => (
    <Alert variant="info" style={{ width: '400px' }}>
      <AlertTitle>Información</AlertTitle>
      <AlertDescription>Este es un mensaje informativo para el usuario.</AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" style={{ width: '400px' }}>
      <AlertTitle>Operación exitosa</AlertTitle>
      <AlertDescription>Los datos fueron guardados correctamente.</AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" style={{ width: '400px' }}>
      <AlertTitle>Atención</AlertTitle>
      <AlertDescription>Esta acción no se puede deshacer. Revisa antes de continuar.</AlertDescription>
    </Alert>
  ),
};

export const Danger: Story = {
  render: () => (
    <Alert variant="danger" style={{ width: '400px' }}>
      <AlertTitle>Error al procesar</AlertTitle>
      <AlertDescription>No fue posible conectar con el servidor. Intenta de nuevo.</AlertDescription>
    </Alert>
  ),
};
