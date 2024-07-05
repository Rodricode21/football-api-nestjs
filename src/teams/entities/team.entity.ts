import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Player } from 'src/players/entities/player.entity';

@Entity({ schema: 'football', name: 'teams' })
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
