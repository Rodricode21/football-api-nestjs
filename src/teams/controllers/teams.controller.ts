import { Controller, Get, Param } from '@nestjs/common';
import { TeamService } from '../services/teams.service';
import { Team } from '../entities/team.entity';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }
}
