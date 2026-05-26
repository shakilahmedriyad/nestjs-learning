import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
