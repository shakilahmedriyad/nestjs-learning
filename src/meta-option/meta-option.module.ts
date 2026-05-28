import { Module } from '@nestjs/common';
import { MetaOptionController } from './meta-option.controller';
import { MetaOptionService } from './provider/meta-option.service';

@Module({
  controllers: [MetaOptionController],
  providers: [MetaOptionService]
})
export class MetaOptionModule {}
