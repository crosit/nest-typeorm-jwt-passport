import { Module } from '@nestjs/common';
import { InventoryController } from './controller/inventory.controller';
import { InventoryService } from './service/inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../../entities/inventory.entities';
import { User } from '../../entities/users.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]),
  TypeOrmModule.forFeature([User])
  ],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
