import { DataSource } from 'typeorm';
import { Player } from './players/entities/player.entity';
import { Team } from './teams/entities/team.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'user',
  password: 'pg_password',
  database: 'postgres',
  entities: [Player, Team],
  migrations: ['dist/migrations/*.{js,ts}'],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
