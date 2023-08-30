import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  transform(value: any) {
    const { error, value: validatedValue } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed', error.message);
    }
    return validatedValue;
  }
}
