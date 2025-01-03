import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern('Task.eliminar')
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.taskService.remove(updateTaskDto.id, updateTaskDto);
  }

  
}
