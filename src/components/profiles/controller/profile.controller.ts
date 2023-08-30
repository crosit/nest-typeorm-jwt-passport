import {Get, Controller, Post, Put, Delete,Body, Param,Response, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProfileService } from '../service/profile.service';
import { CreateProfileDto } from '../dtos/CreateProfileDto.dto';
import { UpdateProfileDto } from '../dtos/UpdateProfileDto.dto';
import { JwtAuthGuard } from '../../../middleware/jwt-auth.guard';
import { createUserSchema, updateUserSchema } from '../joi/validation.joi';
import { JoiValidationPipe } from '../../../utils/joiValidation.pipe';


@Controller('profiles')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) { }
    @Get()
    @UseGuards(JwtAuthGuard)
    findall(){
        const data = this.profileService.findall();
        return data;
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findbyId(@Param() id: number){
        return this.profileService.findbyId(id);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(createUserSchema))
    createProfile(@Body() profileDetails: CreateProfileDto){
        return this.profileService.createProfile(profileDetails);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(updateUserSchema))
    updateProfile(@Param() id: number,@Body() profileDetails: UpdateProfileDto){
        return this.profileService.updateProfile(id, profileDetails);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteProfile(@Param() id: number){
        return this.profileService.deleteProfile(id);
    }
    @Post('element')
    @UseGuards(JwtAuthGuard)
    addElement(@Body() elementDetails: any){
        return this.profileService.addElement(elementDetails);
    }
}
