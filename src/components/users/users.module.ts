import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/users.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User]),TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
