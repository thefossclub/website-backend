import { Injectable } from '@nestjs/common';
import { Machine } from './machine.interface';
@Injectable()
export class MachinesService {
  private machines: Machine[] = [
    {
      id: 1,
      name: 'Lathe Machine',
      status: 'Running',
      temperature: 75,
      energyConsumption: 1200,
    },
    {
      id: 2,
      name: 'CNC Milling Machine',
      status: 'Idle',
      temperature: 65,
      energyConsumption: 800,
    },
    {
      id: 3,
      name: 'Injection Molding Machine',
      status: 'Stopped',
      temperature: 60,
      energyConsumption: 900,
    },
  ];

  getAll(): Machine[] {
    return this.machines;
  }

  getById(id: number): Machine | undefined {
    return this.machines.find((machine) => machine.id === id);
  }

  update(id: number, data: Partial<Machine>): Machine | undefined {
    const machine = this.machines.find((m) => m.id === id);
    if (machine) {
      Object.assign(machine, data);
      return machine;
    }
    return undefined;
  }
}
