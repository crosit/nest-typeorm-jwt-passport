import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { User } from '../../entities/users.entities';
import config from '../../config/envs';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.SECRET_KEY, // Cambia por tu clave secreta real
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy],
})
export class AuthModule {}
