import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../../../entities/inventory.entities';
import { Repository } from 'typeorm';
import { responseHandler } from '../../../utils/response.util';
import { CreateInventoryDto } from '../dtos/CreatePermissionDto.dto';
import { UpdateInventoryDto } from '../dtos/UpdatePermissionDto.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) { }

    async findInventory(params: any) {
        try {
            let filters = {
                take: null,
                skip: null,
                
            };
            if (params?.take || params?.skip) {
                filters.take = parseInt(params.take) || 20;
                filters.skip = parseInt(params.skip) || 0;
            }
            const inventory = await this.inventoryRepository.find(filters);
            return responseHandler(inventory, 'Inventory fetched successfully', true, 200);
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500);
        }
    }
    async findInventoryById(id: number) {
        try {
            const inventory = await this.inventoryRepository.findOne({ where: { id } });
            if (!inventory) {
                return responseHandler([], 'Inventory not found', false, 404);
            }
            return responseHandler(inventory, 'Inventory fetched successfully', true, 200);
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500);
        }
    }
    async createInventory(inventoryDetails: CreateInventoryDto) {
        try {
            // const inventory = await this.inventoryRepository.findOne({ where: { name: inventoryDetails.name } });
            // if (inventory) {
            //     return responseHandler([], 'Inventory already exist', false, 400);
            // }
            const newInventory = await this.inventoryRepository.save(inventoryDetails);
            return responseHandler(newInventory, 'Inventory created successfully', true, 200);
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500);
        }
    }
    async updateInventory(id: number, inventoryDetails: UpdateInventoryDto) {
        try {
            const inventory = await this.inventoryRepository.findOne({ where: { id } });
            if (!inventory) {
                return responseHandler([], 'Inventory not found', false, 404);
            }
            const updatedInventory = await this.inventoryRepository.update(id, inventoryDetails);
            return responseHandler(updatedInventory, 'Inventory updated successfully', true, 200);
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500);
        }
    }
    async deleteInventory(id: number) {
        try {
            const inventory = await this.inventoryRepository.findOne({ where: { id } });
            if (!inventory) {
                return responseHandler([], 'Inventory not found', false, 404);
            }
            const deletedInventory = await this.inventoryRepository.softDelete(id);
            return responseHandler(deletedInventory, 'Inventory deleted successfully', true, 200);
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500);
        }
    }
    
    
}
