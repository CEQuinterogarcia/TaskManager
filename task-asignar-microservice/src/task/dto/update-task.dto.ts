import { IsOptional, IsString } from "class-validator";


export class UpdateTaskDto {
    @IsString()
    id:string

    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsString()
    teamId?: string;

}
