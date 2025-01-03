
import { IsOptional, IsString } from "class-validator";


export class UpdateTaskAsignarDto {
    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsString()
    teamId?: string;

}
