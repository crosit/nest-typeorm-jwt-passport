import { Module } from '@nestjs/common';
import { PermissionController } from './controller/permission.controller';
import { PermissionService } from './service/permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../../entities/permissions.entities';
import { Element } from '../../entities/elements.entities';
import { Profile } from '../../entities/profiles.entities';
import { User } from '../../entities/users.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]),
  TypeOrmModule.forFeature([Element]),
  TypeOrmModule.forFeature([Profile]),
  TypeOrmModule.forFeature([User]),

],
  
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionsModule {}
