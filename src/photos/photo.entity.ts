import { IsString } from 'class-validator';
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class Photo extends BaseEntity {
  @Column('text', { nullable: true })
  @IsString()
  url: string;

  @Column('text', { nullable: true })
  @IsString()
  key: string;

  @Column({ default: false })
  isResized: boolean;
}
