import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  
  @MessagePattern('taskasignar.update')
  update(@Payload(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto.id, updateTaskDto);
  }

 
}
