import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Res } from '@nestjs/common';
import { PrismaPlayerRepository } from './players.service';
import { JwtAuthGuard } from '../services/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PrismaPlayerRepository) {}

  @Post()
  create(@Body() createPlayerDto) {//todo: aca irian los use cases... resolver eso
    return this.playersService.save(createPlayerDto);
  }

  @Get()
  findAll(@Query("page") page: string) {//todo: corregir "" x ' eslint
    const cantResults = 4;
    return this.playersService.findMany({
      skip: (Number(page) - 1) * cantResults,
      take: cantResults,
    });
  }

  @Get("export") //todo: revisar si el orden importa
    async findMany(@Query() query: { name: string | undefined }, @Res() res) {
      const result = await this.playersService.findMany({
        skip: 0,
        take: 100,
        where: { name: query.name || 'b' },
      });
  
      const csv = toCSV(result.data); // todo :refactor
  
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=players.csv');
  
      return res.send(csv);
    }
  
    toCSV(data: any[]) { //todo: refactorizar mover a srvicio
    const header = Object.keys(data[0] || {}).join(',');
  
    const rows = data.map(row =>
      Object.values(row).join(',')
    );
  
    return [header, ...rows].join('\n');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(@Param('id') id: string) { //, @Body() updatePlayerDto: UpdatePlayerDto
    return this.playersService.update({ id: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.delete({ id: +id });
  }
}


function toCSV(data: any[]) { //todo: refactorizar mover a srvicio
  const header = Object.keys(data[0] || {}).join(',');

  const rows = data.map(row =>
    Object.values(row).join(',')
  );

  return [header, ...rows].join('\n');
}