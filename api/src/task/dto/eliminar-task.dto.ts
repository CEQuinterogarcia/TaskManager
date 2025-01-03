
import { IsBoolean } from "class-validator";


export class EliminarTaskDto {
    
    @IsBoolean()
    available: Boolean

}


