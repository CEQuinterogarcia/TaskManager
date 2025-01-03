import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskactService } from './taskact.service';
import { CreateTaskactDto } from './dto/create-taskact.dto';
import { UpdateTaskActDto } from './dto/update-taskact.dto';

@Controller()
export class TaskactController {
  constructor(private readonly taskactService: TaskactService) {}

   @MessagePattern('task.update') 
    update(@Payload(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) updateTaskactDto: UpdateTaskActDto) {
      console.log(updateTaskactDto);
      
    return this.taskactService.update(updateTaskactDto.id, updateTaskactDto);
  }
}


