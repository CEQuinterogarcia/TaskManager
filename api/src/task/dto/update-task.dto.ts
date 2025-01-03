
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { TaskStatus } from "./create-task.dto";

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    limitDate?: Date;

    @IsOptional()
    @IsEnum(TaskStatus) 
    status?: TaskStatus;
}
