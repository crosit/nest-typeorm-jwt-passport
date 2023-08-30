import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards,UsePipes } from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { CreatePermissionDto } from '../dtos/CreatePermissionDto.dto';
import { UpdatePermissionDto } from '../dtos/UpdatePermissionDto.dto';
import { JwtAuthGuard } from '../../../middleware/jwt-auth.guard';
import { JoiValidationPipe } from 'src/utils/joiValidation.pipe';
import { createUserSchema, updateUserSchema } from '../joi/validation.joi';

@Controller('permission')
export class PermissionController {
    constructor(
        private readonly permissionService: PermissionService
    ) { }
    @Get()
    @UseGuards(JwtAuthGuard)
    async findall() {
        return await this.permissionService.findall()
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findbyId(@Param('id') id: number) {
        return await this.permissionService.findbyId(id)
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(createUserSchema))  
    async createPermission(@Body() permissionDetails: CreatePermissionDto) {
        return await this.permissionService.createPermission(permissionDetails)
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(updateUserSchema))
    async updatePermission(@Param('id') id: number, @Body() permissionDetails: UpdatePermissionDto) {
        return await this.permissionService.updatePermission(id, permissionDetails)
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deletePermission(@Param('id') id: number) {
        return await this.permissionService.deletePermission(id)
    }

}
