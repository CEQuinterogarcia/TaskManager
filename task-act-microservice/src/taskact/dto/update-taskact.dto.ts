import { Type } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { TaskStatus } from "./create-taskact.dto";

export class UpdateTaskActDto {
    @IsString()
    id:string

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

