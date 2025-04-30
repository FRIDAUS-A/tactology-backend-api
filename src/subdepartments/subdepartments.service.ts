import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubdepartmentInput } from './dto/create-subdepartment.input';
import { UpdateSubdepartmentInput } from './dto/update-subdepartment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { SubDepartment } from 'src/departments/entities/subdepartment.entity';
import { EntityManager, Repository } from 'typeorm';
import { Department } from 'src/departments/entities/department.entity';

@Injectable()
export class SubdepartmentsService {
  constructor(
    @InjectRepository(SubDepartment)
    private subdepartmentsRepository: Repository<SubDepartment>,
  
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  
    private readonly entityManager: EntityManager,
  ) {}
  async create(createSubdepartmentInput: CreateSubdepartmentInput) {
    const department = await this.departmentsRepository.findOne({
      where: {id: createSubdepartmentInput.departmentId}
    })
    const subdepartment = new SubDepartment({name: createSubdepartmentInput.name, department})
    return await this.entityManager.save(subdepartment);
  }

  async findAll() {
    return await this.departmentsRepository.find();
  }

  async findOne(id: number) {
    const subdepartment = await this.departmentsRepository.findOne({
      where: { id }
    });
    if (!subdepartment) throw new NotFoundException("id does not exist");
    return subdepartment;
  }

  async update(id: number, updateSubdepartmentInput: UpdateSubdepartmentInput) {
    const subdepartment = await this.subdepartmentsRepository.findOne({
      where: { id }
    });
    if (!subdepartment) throw new NotFoundException("id does not exist");
    const department = await this.departmentsRepository.findOneBy({ id: updateSubdepartmentInput.departmentId });
    if (!department) throw new NotFoundException('Department not found');
    subdepartment.name = updateSubdepartmentInput.name;
    subdepartment.department = department;
    return await this.entityManager.save(subdepartment)
  }

  async remove(id: number) {
    const subdepartment = await this.subdepartmentsRepository.findOne({
      where: { id }
    });
    if (!subdepartment) throw new NotFoundException("id does not exist");

    await this.subdepartmentsRepository.delete(id);
    return subdepartment;
  }

}
