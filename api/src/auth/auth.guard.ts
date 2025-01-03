import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { firstValueFrom, Observable } from "rxjs";
import { NATS_SERVICE } from "src/config";

// Clase AuthGuard que implementa la interfaz CanActivate
export class AuthGuard implements CanActivate {
    
    // Constructor que inyecta un ClientProxy para la comunicación con un microservicio
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

    // Método canActivate que determina si se puede activar la ruta protegida
    async canActivate(context: ExecutionContext) {
        // Obtener la solicitud HTTP del contexto de ejecución
        const request = context.switchToHttp().getRequest();
        
        // Extraer el token de la solicitud
        const token = this.tokenExtractor(request);
        if (!token) {
            // Si no hay token, lanzar excepción de no autorizado
            throw new UnauthorizedException();
        }
        
        try {
            // Verificar el token enviándolo al microservicio y esperando una respuesta
            const {user, token: newToken} = await firstValueFrom(
                this.client.send('verify.token', token)
            );
            
            // Si el token es válido, agregar el usuario y el nuevo token a la solicitud
            request.user = user;
            request.token = newToken;
            
            // Permitir el acceso a la ruta
            return true;
        } catch (error) {
            // En caso de error, imprimirlo en consola y lanzar excepción de no autorizado
            console.log(error);
            throw new UnauthorizedException();
        }
    }

    // Método para extraer el token de la cabecera de autorización de la solicitud
    tokenExtractor(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
