import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../../../entities/permissions.entities';
import { Element } from '../../../entities/elements.entities';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../dtos/CreatePermissionDto.dto';
import { UpdatePermissionDto } from '../dtos/UpdatePermissionDto.dto';
import { responseHandler } from '../../../utils/response.util';
import { Profile } from '../../../entities/profiles.entities';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(Element)
        private readonly elementRepository: Repository<Element>,
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) { }

    async findall() {
        try {
            const permission = await this.permissionRepository.find({ relations: ['profile', 'element'] });
            return responseHandler(permission, 'Permission fetched successfully', true, 200)
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500)
        }
    }
    async findbyId(id: number) {
        try {
            const permission = await this.permissionRepository.findOne({ where: { id }, relations: ['profile', 'element'] });
            return responseHandler(permission, 'Permission fetched successfully', true, 200)
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500)
        }
    }
    async createPermission(permissionDetails: any) {
        try {
            
            const element = await this.elementRepository.findOne({ where: { id: permissionDetails.element}});  
            if (!element) {
                return responseHandler([], 'Element not found', false, 404)
            }
            const profile = await this.profileRepository.findOne({ where: { id: permissionDetails.profile}});
            if (!profile) {
                return responseHandler([], 'Profile not found', false, 404)
            }
            const permission = await this.permissionRepository.findOne({ where: { profile: {id:permissionDetails.profile}, element: permissionDetails.element } });
            
            if (permission) {
                return responseHandler([], 'Permission already exist', false, 400)
            }
            
            const newPermission = await this.permissionRepository.save(permissionDetails);

            return responseHandler(newPermission, 'Permission created successfully', true, 200)
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500)
        }
    }
    async updatePermission(id: number, permissionDetails: UpdatePermissionDto) {
        try {
            const permission = await this.permissionRepository.findOne({ where: { id } });
            if (!permission) {
                return responseHandler([], 'Permission not found', false, 404)
            }
            await this.permissionRepository.update(id, permissionDetails);

            return responseHandler([], 'Permission updated successfully', true, 200)
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500)
        }
    }
    async deletePermission(id: number) {
        try {
            const permission = await this.permissionRepository.findOne({ where: { id } });
            if (!permission) {
                return responseHandler([], 'Permission not found', false, 404)
            }
            await this.permissionRepository.delete(id);
            return responseHandler([], 'Permission deleted successfully', true, 200)
        } catch (error) {
            console.log(error);
            return responseHandler([], error.message, false, 500)
        }
    }

}
