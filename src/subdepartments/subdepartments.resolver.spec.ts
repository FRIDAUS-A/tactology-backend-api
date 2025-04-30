import { Test, TestingModule } from '@nestjs/testing';
import { SubdepartmentsResolver } from './subdepartments.resolver';
import { SubdepartmentsService } from './subdepartments.service';

describe('SubdepartmentsResolver', () => {
  let resolver: SubdepartmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdepartmentsResolver, SubdepartmentsService],
    }).compile();

    resolver = module.get<SubdepartmentsResolver>(SubdepartmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
