import { Test, TestingModule } from '@nestjs/testing';
import { TempInventoryService } from './temp-inventory.service';

describe('TempInventoryService', () => {
  let service: TempInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempInventoryService],
    }).compile();

    service = module.get<TempInventoryService>(TempInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
