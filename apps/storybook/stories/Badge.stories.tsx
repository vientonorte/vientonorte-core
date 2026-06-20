import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@vientonorte/ui';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'danger', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Activo', variant: 'default' } };
export const Success: Story = { args: { children: 'Completado', variant: 'success' } };
export const Warning: Story = { args: { children: 'Pendiente', variant: 'warning' } };
export const Danger: Story = { args: { children: 'Error', variant: 'danger' } };
export const Secondary: Story = { args: { children: 'Nuevo', variant: 'secondary' } };
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
