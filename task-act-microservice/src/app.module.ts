import { Module } from '@nestjs/common';
import { TaskactModule } from './taskact/taskact.module';


@Module({
  imports: [TaskactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
