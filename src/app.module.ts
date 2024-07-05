import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module';
import { Player } from './players/entities/player.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersService } from './players/services/players.service';
import { TeamsModule } from './teams/teams.module';
import { Team } from './teams/entities/team.entity';
import { TeamService } from './teams/services/teams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Team]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'user',
      password: 'pg_password',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      migrations: ['dist/migrations/*.{js,ts}'],
      migrationsRun: true,
      extra: {
        cli: {
          entitiesDir: 'src',
          migrationsDir: 'src/migrations',
        },
      },

      synchronize: true,
    }),
    PlayersModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PlayersService, TeamService],
})
export class AppModule {}
