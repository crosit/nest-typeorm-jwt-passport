import { Injectable } from '@nestjs/common';
import { Profile } from '../../../entities/profiles.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dtos/CreateProfileDto.dto';
import { UpdateProfileDto } from '../dtos/UpdateProfileDto.dto';
import { responseHandler } from '../../../utils/response.util';
import { Element } from '../../../entities/elements.entities';


@Injectable()
export class ProfileService {
    
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        
        @InjectRepository(Element)
        private readonly elementRepository: Repository<Element>
        ) { }
    async findall(){
        try {
            const profile = await this.profileRepository.find({relations: ['users']});
            return responseHandler(profile,'Profile fetched successfully', true,200)
        } catch (error) {
            console.log(error);
            return responseHandler(null,error.message, false,500)
        }
    }
    async findbyId(id: number){
        try {
            const profile = await this.profileRepository.findOne({where: {id}});
            if (!profile) {
                return responseHandler([],`Profile not found`, false,404)
            }
            return responseHandler(profile,'Profile fetched successfully', true,200)
        } catch (error) {
            console.log(error);
            return responseHandler(null,error.message, false,500)
        }
    }
    async createProfile(profileDetails: CreateProfileDto){
        try {
            const profile = await this.profileRepository.findOne({where: {name: profileDetails.name}});
            if(profile){
                return responseHandler([],`Profile with name ${profileDetails.name} already exist`, false,400)
            }
            const newProfile = await this.profileRepository.save(profileDetails);
            return responseHandler(newProfile,'Profile created successfully', true,200)
        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
        }
    }
    async updateProfile(id: number, profileDetails: UpdateProfileDto){
        try {
            const profile = await this.profileRepository.findOne({where: {name: profileDetails.name}});
            if(profile){
                return responseHandler([],`Profile with name ${profileDetails.name} already exist`, false,400)
            }
            await this.profileRepository.update(id, profileDetails);
            return responseHandler([],`Profile updated successfully`, true,200)

        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
            
        }
    }
    async deleteProfile(id: number){
        try {
            const profile = await this.profileRepository.findOne({where: {id}});
            if(profile){
                return responseHandler([],`Profile with id not found`, false,404)
            }
            await this.profileRepository.softDelete(id);
            return responseHandler([],`Profile with id deleted successfully`, true,200)
        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
        }
    }
    async addElement(elementDetails: any){
        try {
            
            const profile = await this.profileRepository.findOne({where: {id: elementDetails.profileId}, relations: ['elements']});
            if (!profile) {
                return responseHandler([],`Profile not found`, false,404)
            }
            const element = await this.elementRepository.findOne({where: {id: elementDetails.elementId}});
            if (!element) {
                return responseHandler([],`Element not found`, false,404)
            }
            profile.elements.push(element);
            
            const data = await this.profileRepository.save(profile);
            return responseHandler(data,`Element added to profile successfully`, true,200)
        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
        }
    }
}
