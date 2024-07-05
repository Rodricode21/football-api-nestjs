import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { Repository } from 'typeorm';
import { PlayerDto } from '../dtos/player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async findById(id: number): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ id });

    if (!player) {
      throw new NotFoundException(`player with id ${id} not found`);
    }
    return player;
  }

  //   async createPlayer(playerData: PlayerDto): Promise<Player> {
  //     const player = this.playerRepository.create(playerData);
  //     return await this.playerRepository.save(player);
  //   }

  //   async findByTeam(team: string): Promise<Player[]> {
  //     return this.playerRepository.find({ where: { team } });
  //   }
}
