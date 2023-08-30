import { Controller,Get,Post,Put,Delete,Param,Body,Query, UseGuards } from '@nestjs/common';
import { InventoryService } from '../service/inventory.service';
import { CreateInventoryDto } from '../dtos/CreatePermissionDto.dto';
import { UpdateInventoryDto } from '../dtos/UpdatePermissionDto.dto';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {

    }
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() queryParams: any) {
        return this.inventoryService.findInventory(queryParams);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: number) {
        return this.inventoryService.findInventoryById(id);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createInventoryDto: CreateInventoryDto) {
        return this.inventoryService.createInventory(createInventoryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: number, @Body() updateInventoryDto: UpdateInventoryDto) {
        return this.inventoryService.updateInventory(id, updateInventoryDto);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: number) {
        return this.inventoryService.deleteInventory(id);
    }

}
