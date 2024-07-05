import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PlayersService } from '../services/players.service';
import { Player } from '../entities/player.entity';
import { PlayerDto } from '../dtos/player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    try {
      const players = await this.playerService.findAll();
      return players;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch players',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      const player = await this.playerService.findById(id);
      return player;
    } catch {
      throw new HttpException('Failed to fetch player', HttpStatus.NOT_FOUND);
    }
  }
}
