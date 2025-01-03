import { Module } from '@nestjs/common';
import { TaksModule } from './taks/taks.module';


@Module({
  imports: [TaksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
