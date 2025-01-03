import { IsEnum, IsString } from "class-validator";
export enum TaskStatus { PENDING = "PENDING", IN_PROGRESS = "IN_PROGRESS", COMPLETED = "COMPLETED",}

export class MarcarTaskDto {
    
    @IsString()
    @IsEnum(TaskStatus)
    status: string

}