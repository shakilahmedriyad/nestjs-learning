import { PartialType } from '@nestjs/swagger';
import { SaveUserDto } from './save-user.dto';

export class PatchUserDto extends PartialType(SaveUserDto) {}
