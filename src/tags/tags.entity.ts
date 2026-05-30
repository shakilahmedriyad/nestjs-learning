import { Post } from 'src/post/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
  })
  name: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'varchar',
    length: 512,
    unique: true,
  })
  slug: string;

  // @ManyToMany(() => Post, (post) => post.tags)
  // posts?: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
