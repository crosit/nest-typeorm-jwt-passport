import {Get, Controller, Post, Put, Delete,Body, Param,Response,UseGuards, UsePipes } from '@nestjs/common';
import { ElementsService } from '../service/elements.service';
import { CreateElementDto } from '../dtos/CreateElementDto.dto';
import { UpdateElementDto } from '../dtos/UpdateElementDto.dto';
import { JwtAuthGuard } from '../../../middleware/jwt-auth.guard';
import { createUserSchema, updateUserSchema } from '../joi/validation.joi';
import { JoiValidationPipe } from '../../../utils/joiValidation.pipe';

@Controller('elements')
export class ElementsController {
    constructor(
        private readonly elementsService: ElementsService
    ) { }
    @Get()
    @UseGuards(JwtAuthGuard)
    findall(){
        const data = this.elementsService.findAll();
        return data;
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findbyId(@Param() id: number, @Response() res: any){
        return this.elementsService.findById(id);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(createUserSchema))
    createElement(@Body() elementDetails: CreateElementDto){
        return this.elementsService.createElement(elementDetails);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(updateUserSchema))
    updateElement(@Param() id: number,@Body() elementDetails: UpdateElementDto){
        return this.elementsService.updateElement(id, elementDetails);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteElement(@Param() id: number){
        return this.elementsService.deleteElement(id);
    }

}
