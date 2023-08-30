import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile.controller';
import { ProfileService } from './service/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../entities/profiles.entities';
import { Element } from '../../entities/elements.entities';
import { User } from '../../entities/users.entities';


@Module({
  imports: [
  TypeOrmModule.forFeature([Profile]),
  TypeOrmModule.forFeature([Element]),
  TypeOrmModule.forFeature([User]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfilesModule {}
