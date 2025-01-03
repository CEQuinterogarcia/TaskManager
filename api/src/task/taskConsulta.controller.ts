import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { NATS_SERVICE } from 'src/config';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { User as IUser } from '../auth/entities/auth.entity';
import { catchError } from 'rxjs';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskAsignarDto } from './dto/update-taskasignar.dto';

@Controller('task')
export class TaskConsultaController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() user: IUser) {
    return this.client.send('task.findAll', user.id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
