import { Injectable, OnModuleInit } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { environments } from 'src/config';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit{
  constructor(private readonly jwtservice: JwtService){
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }


  async register(registerUserDto: RegisterUserDto) {
    const exist = await this.user.findUnique({
      where: {
        email: registerUserDto.email
      }
    })

    if (exist) {
      throw new RpcException(
        {
        status: 400,
        message: `${registerUserDto.email }is already registrer`
      })
    }
    const newUser = await this.user.create({
      data: {
        ...registerUserDto,
        password: bcrypt.hashSync(registerUserDto.password,10)
      }
    })

    return newUser;
  }



  async login(loginUserDto:LoginUserDto) {

    const exist = await this.user.findUnique({
      where: {
        email: loginUserDto.email
      }
    })

    if (!exist) {
      throw new RpcException(
        {
        status: 400,
        message: `${loginUserDto.email }is not register`
      })
    }
    const isPasswordCorret = bcrypt.compareSync(loginUserDto.password, exist.password)
    
    if (!isPasswordCorret) {
      throw new RpcException(
        {
        status: 401,
        message:'password is Incorrect'
      })
    }

    const {password: _, createdAt: __, updatedAt: ___, ...rest} = exist
    return {
      user: rest,
      token: this.signJwt(rest)
    }
  }


  async verify(token: string) {

    try {
      const {sub: _, iat: __, exp: ___, ...user}= this.jwtservice.verify(
        token, {
          secret: environments.jwtsecret
         }
      )
      return {
        user: user,
        token: this.signJwt(user)
      }
      
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message
      })


    }
    return `This action returns a #${token} auth`;
  }

  signJwt(payload: IJwtPayload){
    return this.jwtservice.sign(payload)

  }

 
}
