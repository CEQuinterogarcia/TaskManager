import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateTaksDto } from './dto/create-taks.dto';
import { UpdateTakDto } from './dto/update-tak.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TaksService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
  }

  async create(createTaksDto: CreateTaksDto) {
   console.log(createTaksDto);
   
    try {
     // createTaksDto.limitDate = new Date(createTaksDto.limitDate);
      return await this.task.create({
        data: createTaksDto
      })
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: `Error al crear la tarea: ${error.message}`
      })
    }
 
  }

  async findAll(id: string) { 
    return await this.task.findMany({ where: { available: true, }, });
   }

}
