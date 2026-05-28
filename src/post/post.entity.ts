import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { PostType } from './enums/postType.enum';
import { statusType } from './enums/statusType.enum';

export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'varchar',
    enum: PostType,
    default: PostType.POST,
  })
  postType: PostType;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
    enum: statusType,
    default: statusType.DRAFT,
  })
  status: statusType;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  featuredImageUrl: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  publishedOn: Date;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @Column({
    type: 'json',
    nullable: true,
  })
  metaOptions: string;
}
