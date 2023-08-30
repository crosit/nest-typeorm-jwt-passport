import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/users.entities';
import { CreateUserParams, UpdateUserParams } from '../../../utils/types';
import { hash } from 'bcrypt';
import { responseHandler } from '../../../utils/response.util';
import { number } from 'joi';




@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUsers(params: any) {
    try {
      let filters = {
        take:null,
        skip:null,
        relations: ['profile']
      };
      if (params?.take || params?.skip) {
        filters.take = parseInt(params.take)||20;
        filters.skip = parseInt(params.skip)||0;
      }
      const users = await this.userRepository.find(filters);
      return responseHandler(users,'Users fetched successfully', true,200)
    } catch (error) {
      console.log(error);
      
      return responseHandler([],error.message, false,500)
    }
  }
  async findUserById(id: number) {
    try {
      
      const user = await this.userRepository.findOne({where: {id}});
      if (!user) {
        return responseHandler([],`User not found`, false,404)
      }
      return responseHandler(user,'User fetched successfully', true,200)

    } catch (error) {
      console.log(error);
      return responseHandler([],error.message, false,500)
      
    }
  }
  async createUsers(usersDetails: CreateUserParams) {
    try {
      const user = await this.userRepository.findOne({where: {email: usersDetails.email}});
      if (user) {
        return responseHandler([],`User email already exists`, false,400)
      }
      //logic to encrypt password

      const hashedPassword = await hash(usersDetails.password, 10);
      usersDetails.password = hashedPassword;
      const newUser = await this.userRepository.save(usersDetails);
      delete newUser.password;
      return responseHandler(newUser,'User created successfully', true,200)
    } catch (error) {
      return responseHandler([],error.message, false,500)
    }
  }
  async updateUserById(id: number, usersDetails: UpdateUserParams) {
    try {
      const user = await this.userRepository.findOne({where: {id}});

      if (!user) {
        return responseHandler([],`User not found`, false,404)
      }
      //logic to encrypt password if password is provided
      if (usersDetails.password) {
        const hashedPassword = await hash(usersDetails.password, 10);
        usersDetails.password = hashedPassword;
      }
      //logic to update user
      await this.userRepository.update(id, usersDetails)
      //logic to return response success
      return responseHandler([],'User updated successfully', true,200)

    } catch (error) {
      //logic to return response error
      console.log(error);
      return responseHandler([],error.message, false,500)
      
    }
  }
  async deleteUserById(id: number) {
    try {
      //validate if user exists
      const user = await this.userRepository.findOne({where: {id}});

      if (!user) {
        return responseHandler([],`User not found`, false,404)
      }

      //logic to delete user
      await this.userRepository.softDelete(id);
      return responseHandler([],'User deleted successfully', true,200)
      
    } catch (error) {
      console.log(error);
      return responseHandler([],error.message, false,500)
      
    }
  }
  

}
