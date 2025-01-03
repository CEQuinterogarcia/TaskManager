import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {
    @IsEmail()
    @IsString()
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(55)
    password: string

}