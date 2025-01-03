import { PartialType } from '@nestjs/mapped-types';
import { CreateTaksDto } from './create-taks.dto';

export class UpdateTakDto extends PartialType(CreateTaksDto) {
  id: number;
}
