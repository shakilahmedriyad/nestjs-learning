import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { PostType } from './enums/postType.enum';
import { statusType } from './enums/statusType.enum';
import { CreatePostMetaOptionDto } from '../meta-option/dto/create-post-meta-option.dto';

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
    type: 'text',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  schema: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  featuredImageUrl: string;

  @Column({
    type: 'timestamp',
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
    type: 'jsonb',
    nullable: true,
  })
  metaOptions: CreatePostMetaOptionDto[];
}
