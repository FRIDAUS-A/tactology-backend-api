import { Test, TestingModule } from '@nestjs/testing';
import { SubdepartmentsService } from './subdepartments.service';

describe('SubdepartmentsService', () => {
  let service: SubdepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdepartmentsService],
    }).compile();

    service = module.get<SubdepartmentsService>(SubdepartmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
