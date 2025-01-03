import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateTaskActDto } from './dto/update-taskact.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TaskactService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async update(id: string, updateTaskactDto: UpdateTaskActDto) {
    console.log(id, updateTaskactDto);

    const { id: _id, ...data } = updateTaskactDto;  // Excluyendo el campo id

    try {
      return await this.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: `Error al actualizar la tarea: ${error.message}`,
      });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} taskact`;
  }
}
