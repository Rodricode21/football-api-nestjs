import { Module } from '@nestjs/common';
import { TeamService } from './services/teams.service';
import { TeamController } from './controllers/teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],

  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamsModule {}
