import { Module } from '@nestjs/common';
import { ElementsController } from './controller/elements.controller';
import { ElementsService } from './service/elements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from '../../entities/elements.entities';
import { User } from '../../entities/users.entities';


@Module({
  imports: [
  TypeOrmModule.forFeature([Element]),
  TypeOrmModule.forFeature([User])
],
  controllers: [ElementsController],
  providers: [ElementsService]
})
export class ElementsModule {}
