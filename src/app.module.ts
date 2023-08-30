import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './components/users/users.module';
import config  from './config/envs';
import { User } from './entities/users.entities';
import { ProfilesModule } from './components/profiles/profiles.module';
import { AuthModule } from './components/auth/auth.module';
import { Profile } from './entities/profiles.entities';
import { Element } from './entities/elements.entities';
import { ElementsModule } from './components/elements/elements.module';
import { PermissionsModule } from './components/permissions/permissions.module';
import { Permission } from './entities/permissions.entities';
import { Inventory } from './entities/inventory.entities';
import { Models } from './entities/models.entitie';
import { Truck } from './entities/truckLoad.entities';
import { InventoryModule } from './components/inventory/inventory.module';


const arrayEntities = [
  User,
  Profile,
  Element,
  Permission,
  Inventory,
  Models,
  Truck,
];

const typeOrmConfig:Object = config.typeorm;
const entitieObjects = {...typeOrmConfig, entities: arrayEntities};
@Module({
  imports: [TypeOrmModule.forRoot(entitieObjects), UsersModule, ProfilesModule, AuthModule, ElementsModule, PermissionsModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


