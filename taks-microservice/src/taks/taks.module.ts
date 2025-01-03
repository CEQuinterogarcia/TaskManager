import { Module } from '@nestjs/common';
import { TaksService } from './taks.service';
import { TaksController } from './taks.controller';

@Module({
  controllers: [TaksController],
  providers: [TaksService],
})
export class TaksModule {}
