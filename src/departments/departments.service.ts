import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/subdepartment.entity';
import { UpdateDepartmentInput } from './dto/update-department.input';


@Injectable()
export class DepartmentsService {
  constructor (
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    private readonly entityManager: EntityManager
  ) {}
  async create(createDepartmentInput: CreateDepartmentInput) {
    const subdepartments = createDepartmentInput.subdepartments.map(sub =>
      new SubDepartment({ name: sub.name })
    );
  
    const department = new Department({
      name: createDepartmentInput.name,
      subdepartments: subdepartments,
    });
  
    
    subdepartments.forEach(sd => (sd.department = department));
  
    return await this.entityManager.save(department);
  }
  async findAll() {
    return await this.departmentsRepository.find();
  }

  async findOne(id: number) {
    const department =  await this.departmentsRepository.findOne({
      where: { id }
    });
    if (!department) throw new NotFoundException("id does not exist");
    return department
  }

  async update(id: number, updateDepartmentInput: UpdateDepartmentInput) {
    const department = await this.departmentsRepository.findOne({
      where: { id }
    });
    if (!department) throw new NotFoundException("id does not exist");
    department.name = updateDepartmentInput.name;
    return await this.entityManager.save(department);
  }

  async remove(id: number) {
    const department = await this.departmentsRepository.findOne({
      where: { id }
    });
    if (!department) throw new NotFoundException("id does not exist");
    await this.departmentsRepository.delete(id);
    return department
  }
}
