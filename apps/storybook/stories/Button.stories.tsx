import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@vientonorte/ui';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Acción principal', variant: 'primary', size: 'md' },
};

export const Secondary: Story = {
  args: { children: 'Acción secundaria', variant: 'secondary', size: 'md' },
};

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost', size: 'md' },
};

export const Danger: Story = {
  args: { children: 'Eliminar', variant: 'danger', size: 'md' },
};

export const Loading: Story = {
  args: { children: 'Guardando…', variant: 'primary', size: 'md', loading: true },
};

export const Disabled: Story = {
  args: { children: 'No disponible', variant: 'primary', size: 'md', disabled: true },
};

export const Small: Story = {
  args: { children: 'Pequeño', variant: 'primary', size: 'sm' },
};

export const Large: Story = {
  args: { children: 'Grande', variant: 'primary', size: 'lg' },
};
