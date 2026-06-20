import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch, Checkbox, Progress, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Label } from '@vientonorte/ui';

const meta: Meta = {
  title: 'Atoms/FormControls',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const SwitchControl: StoryObj = {
  name: 'Switch',
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch checked={on} onCheckedChange={setOn} id="sw-demo" />
        <Label htmlFor="sw-demo">Notificaciones {on ? 'activadas' : 'desactivadas'}</Label>
      </div>
    );
  },
};

export const CheckboxControl: StoryObj = {
  name: 'Checkbox',
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Checkbox
          id="cb-demo"
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
        />
        <Label htmlFor="cb-demo">Acepto los términos y condiciones</Label>
      </div>
    );
  },
};

export const ProgressControl: StoryObj = {
  name: 'Progress',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <Label>25%</Label>
        <Progress value={25} max={100} />
      </div>
      <div>
        <Label>60%</Label>
        <Progress value={60} max={100} />
      </div>
      <div>
        <Label>90%</Label>
        <Progress value={90} max={100} />
      </div>
    </div>
  ),
};

export const SelectControl: StoryObj = {
  name: 'Select',
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '240px' }}>
        <Label htmlFor="select-demo">Período</Label>
        <Select value={val} onValueChange={setVal}>
          <SelectTrigger id="select-demo">
            <SelectValue placeholder="Selecciona período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dia">Hoy</SelectItem>
            <SelectItem value="semana">Esta semana</SelectItem>
            <SelectItem value="mes">Este mes</SelectItem>
            <SelectItem value="trimestre">Este trimestre</SelectItem>
            <SelectItem value="ano">Este año</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};
