import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Element } from '../../../entities/elements.entities';
import { responseHandler } from '../../../utils/response.util';
import { CreateElementDto } from '../dtos/CreateElementDto.dto';
import { UpdateElementDto } from '../dtos/UpdateElementDto.dto';

@Injectable()
export class ElementsService {
    constructor(
        @InjectRepository(Element)
        private readonly elementRepository: Repository<Element>,
    ) {}

    async findAll() {
        try {
            const elements = await this.elementRepository.find();
            return responseHandler(elements,'Elements fetched successfully', true,200)
        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
        }
    }
    async findById(id: number) {
        try {
            const element = await this.elementRepository.findOne({where: {id}});
            if (!element) {
                return responseHandler([],`Element not found`, false,404)
            }
            return responseHandler(element,'Element fetched successfully', true,200)
        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
        }
    }
    async createElement(elementDetails: CreateElementDto) {
        try {
            const element = await this.elementRepository.findOne({where: {name: elementDetails.name}});
            if(element){
                return responseHandler([],`Element with name ${elementDetails.name} already exist`, false,400)
            }
            const newElement = await this.elementRepository.save(elementDetails);
            return responseHandler(newElement,'Element created successfully', true,200)
        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
        }
    }
    async updateElement(id: number, elementDetails: UpdateElementDto) {
        try {
            const element = await this.elementRepository.findOne({where: {name: elementDetails.name}});
            if(element){
                return responseHandler([],`Element with name ${elementDetails.name} already exist`, false,400)
            }
            await this.elementRepository.update(id, elementDetails);
            return responseHandler([],`Element updated successfully`, true,200)

        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
        }
    }
    async deleteElement(id: number) {
        try {
            await this.elementRepository.delete(id);
            return responseHandler([],`Element deleted successfully`, true,200)
        } catch (error) {
            console.log(error);
            return responseHandler([],error.message, false,500)
        }
    }
}
