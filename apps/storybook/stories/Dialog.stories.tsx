import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog, Button, Input } from '@vientonorte/ui';

const meta: Meta = {
  title: 'Molecules/Dialog',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Basic: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Abrir diálogo</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar acción"
          description="¿Estás seguro de que quieres continuar con esta operación?"
        >
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Confirmar</Button>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithForm: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Nuevo elemento</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Agregar elemento"
          description="Completa los datos para crear el nuevo elemento."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <Input label="Nombre" placeholder="Nombre del elemento" />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Crear</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};
