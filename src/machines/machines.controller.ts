import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Machine } from './machine.interface';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Machine[] {
    return this.machinesService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Machine | { message: string } {
    const machine = this.machinesService.getById(id);
    return machine ?? { message: 'Machine not found' };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/update')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Machine>,
  ): Machine | { message: string } {
    const updated = this.machinesService.update(id, updateData);
    return updated ?? { message: 'Machine not found' };
  }
}
