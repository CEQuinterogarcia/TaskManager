import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

// Decorador @Catch para manejar excepciones de tipo RpcException
@Catch(RpcException)
export class GlobalRpcExceptionFilter implements ExceptionFilter {
  
  // Método para manejar las excepciones
  catch(exception: RpcException, host: ArgumentsHost) {
    // Obtener el contexto HTTP
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Obtener el error de la excepción RPC
    const rpcError = exception.getError();

    // Manejo específico para errores que contienen 'Empty response'
    if (rpcError.toString().includes('Empty response ')) {
      return response.status(500).json({
        status: 500,
        message: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),  // Extraer el mensaje del error
      });
    }

    // Manejo para errores que son objetos y contienen propiedades 'status' y 'message'
    if (typeof rpcError == 'object' && 
        'status' in rpcError && 
        'message' in rpcError ) {

       const status = isNaN(+rpcError.status) ? 400: +rpcError.status;  // Validar el estado
       return response.status(status).json(rpcError);
    }

    // Manejo para otros tipos de errores
    response.status(400).json({
        status: 400,
        message: rpcError  // Enviar el mensaje del error
    });
  }
}
