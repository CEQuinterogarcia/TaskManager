import { IsBoolean, IsString } from "class-validator";


export class UpdateTaskDto {
    @IsString()
    id:string

    @IsBoolean()
    available: boolean

}