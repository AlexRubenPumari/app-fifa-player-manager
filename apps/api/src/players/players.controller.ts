import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PrismaPlayerRepository } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PrismaPlayerRepository) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {//todo: aca irian los use cases... resolver eso
    return this.playersService.save(createPlayerDto);
  }

  @Get()
  findAll(@Query("page") page: string) {//todo: corregir "" x ' eslint
    return this.playersService.findMany({ skip: (Number(page) - 1) * 4 });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update({ id: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.delete({ id: +id });
  }
}
