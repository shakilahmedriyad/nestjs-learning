import { Module } from '@nestjs/common';
import { MetaOptionController } from './meta-option.controller';
import { MetaOptionService } from './provider/meta-option.service';
import { MetaOption } from './meta-option.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MetaOptionController],
  providers: [MetaOptionService],
  imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptionModule {}
