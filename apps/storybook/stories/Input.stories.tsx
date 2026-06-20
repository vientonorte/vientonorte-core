import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@vientonorte/ui';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Campo de texto', placeholder: 'Escribe aquí…' },
};

export const WithHint: Story = {
  args: { label: 'Contraseña', type: 'password', hint: 'Mínimo 8 caracteres', placeholder: '••••••••' },
};

export const WithError: Story = {
  args: { label: 'Email', type: 'email', error: 'El email no es válido', value: 'no-es-email', placeholder: 'tu@email.com' },
};

export const Required: Story = {
  args: { label: 'Nombre completo', required: true, placeholder: 'Rodrigo Gaete' },
};

export const Disabled: Story = {
  args: { label: 'Campo deshabilitado', disabled: true, placeholder: 'No editable' },
};
