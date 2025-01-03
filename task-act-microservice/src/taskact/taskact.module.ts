import { Module } from '@nestjs/common';
import { TaskactService } from './taskact.service';
import { TaskactController } from './taskact.controller';

@Module({
  controllers: [TaskactController],
  providers: [TaskactService],
})
export class TaskactModule {}
