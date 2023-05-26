import { IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  @IsString()
  url: string;

  @Column('text', { nullable: true })
  @IsString()
  key: string;

  @Column({ default: false })
  isResized: boolean;
}
