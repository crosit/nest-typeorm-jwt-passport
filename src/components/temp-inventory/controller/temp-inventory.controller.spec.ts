import { Test, TestingModule } from '@nestjs/testing';
import { TempInventoryController } from './temp-inventory.controller';

describe('TempInventoryController', () => {
  let controller: TempInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempInventoryController],
    }).compile();

    controller = module.get<TempInventoryController>(TempInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
