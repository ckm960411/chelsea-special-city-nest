import { IsString } from 'class-validator';
import { User } from 'src/auth/user.entity';
import { Player } from 'src/players/player.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column()
  @IsString()
  content: string;

  @ManyToOne(() => Player, (player) => player.comments)
  @JoinColumn()
  player: Player;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;
}
