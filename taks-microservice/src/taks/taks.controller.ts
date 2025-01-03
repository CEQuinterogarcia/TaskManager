import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaksService } from './taks.service';
import { CreateTaksDto } from './dto/create-taks.dto';
import { UpdateTakDto } from './dto/update-tak.dto';

@Controller()
export class TaksController {
  constructor(private readonly taksService: TaksService) {}

  @MessagePattern('task.create')
  create(@Payload() createTaksDto: CreateTaksDto) {

    return this.taksService.create(createTaksDto);
  }

  @MessagePattern('task.findAll')
  findAll(@Payload() userId: string) {
    return this.taksService.findAll(userId);
  }


}
