import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { NatsModule } from 'src/transports/nats.module';
import { TaskConsultaController } from './taskConsulta.controller';

@Module({
  controllers: [TaskController, TaskConsultaController],
  providers: [],
  imports: [NatsModule]
})
export class TaskModule {}
