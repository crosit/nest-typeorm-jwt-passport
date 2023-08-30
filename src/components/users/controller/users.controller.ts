import { Controller, Get, Post, Body, Put, Param,Delete, UseGuards, UsePipes,Query } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UpdateUserDto } from '../dtos/UpdateUser.dto';
import { JwtAuthGuard } from '../../../middleware/jwt-auth.guard';
import { CurrentUser } from '../../../config/userDecorator.config';
import { JoiValidationPipe  } from '../../../utils/joiValidation.pipe';
import { createUserSchema, updateUserSchema } from '../Joi/validation.joi';



@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queryParams: any) {
    return this.userService.findUsers(queryParams);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@CurrentUser() user, @Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(createUserSchema))
  postUsers(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.createUsers(createUserDto);
    return user;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(updateUserSchema))
  updateUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }

}
