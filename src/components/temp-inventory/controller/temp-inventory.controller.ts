import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TempInventoryService } from '../service/temp-inventory.service';

@Controller('temp-inventory')
export class TempInventoryController {
    constructor(
        private readonly tempInventoryService: TempInventoryService
    ) { }

    @Get()
    async findAll(@Param() params: any) {
        return await this.tempInventoryService.findTempInventory(params);
    }
    @Get(':id')
    async findById(id: number) {
        return await this.tempInventoryService.findTempInventoryById(id);
    }
    @Post()
    async create(tempInventoryDetails: any) {
        return await this.tempInventoryService.createTempInventory(tempInventoryDetails);
    }
    @Put(':id')
    async update(id: number, tempInventoryDetails: any) {
        return await this.tempInventoryService.updateTempInventory(id, tempInventoryDetails);
    }
    @Delete(':id')
    async delete(id: number) {
        return await this.tempInventoryService.deleteTempInventory(id);
    }
}
