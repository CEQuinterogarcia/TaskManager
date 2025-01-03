import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TaskService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async remove(id: string, updateTaskDto: UpdateTaskDto) {
    //console.log(id, updateTaskDto);

    const { id: _id, ...data } = updateTaskDto;  // Excluyendo el campo id

    try {
      return await this.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: `Error al Asignar la tarea: ${error.message}`,
      });
    }
  }
 
 
}
