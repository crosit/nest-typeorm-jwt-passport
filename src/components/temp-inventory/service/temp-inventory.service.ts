import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TempInventory } from 'src/entities/TemInventory.entitie';
import { Repository } from 'typeorm';

@Injectable()
export class TempInventoryService {
  constructor(
    @InjectRepository(TempInventory)
    private readonly tempInventoryRepository: Repository<TempInventory>,
  ) {}

  async findTempInventory(params: any) {
    try {
      let filters = {
        take: null,
        skip: null,
      };
      if (params?.take || params?.skip) {
        filters.take = parseInt(params.take) || 20;
        filters.skip = parseInt(params.skip) || 0;
      }
      const tempInventory = await this.tempInventoryRepository.find(filters);
      return tempInventory;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async findTempInventoryById(id: number) {
    try {
      const tempInventory = await this.tempInventoryRepository.findOne({
        where: { id },
      });
      if (!tempInventory) {
        return [];
      }
      return tempInventory;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async createTempInventory(tempInventoryDetails: any) {
    try {
      // const tempInventory = await this.tempInventoryRepository.findOne({ where: { name: tempInventoryDetails.name } });
      // if (tempInventory) {
      //     return [];
      // }
      const newTempInventory =
        await this.tempInventoryRepository.save(tempInventoryDetails);
      return newTempInventory;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async updateTempInventory(id: number, tempInventoryDetails: any) {
    try {
      const tempInventory = await this.tempInventoryRepository.findOne({
        where: { id },
      });
      if (!tempInventory) {
        return [];
      }
      await this.tempInventoryRepository.update({ id }, tempInventoryDetails);
      return tempInventory;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async deleteTempInventory(id: number) {
    try {
      const tempInventory = await this.tempInventoryRepository.findOne({
        where: { id },
      });
      if (!tempInventory) {
        return [];
      }
      await this.tempInventoryRepository.softDelete({ id });
      return tempInventory;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
