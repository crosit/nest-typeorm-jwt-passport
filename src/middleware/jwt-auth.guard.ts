import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    try {
      
      const request = context.switchToHttp().getRequest();
      const moduleName = context.getClass().name;
      console.log('moduleName',context.getClass().name);
      // console.log('methodName',context.getHandler().name);
  
      const token = request.headers.authorization.replace('Bearer ', '');
  
      const jwtService = new JwtService({}); // Configura el JwtService según tu aplicación
  
      const decodedToken = jwtService.decode(token); // Decodifica el token sin verificar la firma
      
      if (!decodedToken) {
        return false;
      }
      
      const user = await this.userRepository.findOne(
        {
          where: {
            id: decodedToken['id'],
            profile: {
              permissions: { 
                element: {
                  name: moduleName,
                }
              }
            }
          },
          select: {
            id:true,
            profile:{
              id:true,
              permissions:{
                id:true,
                element:{
                  id:true,
                  name:true
                }
              }
            }
          },
          relations: ['profile', 'profile.permissions', 'profile.permissions.element']
        }
      )
      
      console.log('user',user);
      if(user === null){
        return false;
      }
      return true;
      
    } catch (error) {
      console.log('import User into module');
      console.log(error);
      return false;
      
    }
  }
}

