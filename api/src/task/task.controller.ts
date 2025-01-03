import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
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
export class TaskController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  //CREAR TAREA**********************************

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @User() user: IUser) {
    return this.client
      .send('task.create', { ...createTaskDto, userId: user.id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

    //ACTUALIZAR TAREA**********************************

  @UseGuards(AuthGuard) @Put('actualizar/:id') 
  update(@Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) 
    updateTakDto: UpdateTaskDto,
   
  ) {
    console.log(id, updateTakDto);
    updateTakDto.limitDate = new Date(updateTakDto.limitDate);
    return this.client
      .send('task.update', { id,  ...updateTakDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  //ASIGNAR TAREA**********************************

  @UseGuards(AuthGuard) @Patch('asignar/:id') 
  updateAsignar(@Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) 
    updateTakAsignarDto: UpdateTaskAsignarDto,
   
  ) {
    console.log(id, updateTakAsignarDto);
     return this.client
      .send('taskasignar.update', { id,  ...updateTakAsignarDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

//ELIMINAR TAREA**********************************

@UseGuards(AuthGuard) @Delete(':id') 
eliminar(@Param('id') id: string)
 {
  console.log(id);
  const available=false;
   return this.client
    .send('Task.eliminar', { id,  available })
    .pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
}


//MARCAR EL ESTADO DE LA TAREA**********************************

@UseGuards(AuthGuard) @Put('marcar/:id') 
  marcar(@Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) 
    updateTakDto: UpdateTaskDto,
   
  ) {
    console.log(id, updateTakDto);
    return this.client
      .send('task.marcar', { id,  ...updateTakDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }



  // @UseGuards(AuthGuard)
  // @Get()
  // findAll(@User() user: IUser) {
  //   return this.client.send('task.findAll', user.id).pipe(
  //     catchError((error) => {
  //       throw new RpcException(error);
  //     }),
  //   );
  // }
}
