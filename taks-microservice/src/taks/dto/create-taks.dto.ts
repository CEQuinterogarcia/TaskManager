import { Type } from "class-transformer";
import { IsDate, IsEnum, IsString, MaxLength } from "class-validator";

export enum TaskStatus { PENDING = "PENDING", IN_PROGRESS = "IN_PROGRESS", COMPLETED = "COMPLETED",}

export class CreateTaksDto {
    @IsString()
    @MaxLength(50)
    title: string;

    @IsString()
    description: string;

    @Type(() => Date)
    @IsDate()
    limitDate: Date;

    @IsEnum(TaskStatus) 
    status: TaskStatus;

    @IsString()
    userId: string;
}
