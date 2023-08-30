import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');

    const jwtService = new JwtService({}); // Configura el JwtService según tu aplicación

    const decodedToken = jwtService.decode(token); // Decodifica el token sin verificar la firma

    return decodedToken; // Aquí tendrás acceso al contenido del token (usuario y otros datos)
  },
);
