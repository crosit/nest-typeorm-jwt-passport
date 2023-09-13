import { Module } from '@nestjs/common';
import { TempInventoryService } from './service/temp-inventory.service';
import { TempInventoryController } from './controller/temp-inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempInventory } from '../../entities/TemInventory.entitie';
import { User } from 'src/entities/users.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([TempInventory]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [TempInventoryController],
  providers: [TempInventoryService]
})
export class TempInventoryModule {}
