import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SaveUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  name: string;

  @ApiProperty({
    description: 'The age of the user',
    example: 25,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  @Max(99)
  age: number;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The mobile number of the user',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  mobile: string;
}
