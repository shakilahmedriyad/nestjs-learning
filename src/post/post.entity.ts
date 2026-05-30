import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType } from './enums/postType.enum';
import { statusType } from './enums/statusType.enum';
import { MetaOption } from 'src/meta-option/meta-option.entity';
import { Tag } from 'src/tags/tags.entity';

@Entity()
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
    type: 'timestamp',
    nullable: true,
  })
  publishedOn: Date;

  @Column({
    type: 'text',
    array: true,
    default: [],
    nullable: true,
  })
  tags?: string[];

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
  })
  metaOptions?: MetaOption;
}
