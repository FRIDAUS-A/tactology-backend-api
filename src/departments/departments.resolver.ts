import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuardGuard } from 'src/auth/guards/gql-jwt-guard/gql-jwt-guard.guard';
import { Department } from './entities/department.entity';
import { UpdateDepartmentInput } from './dto/update-department.input';


@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => Department)
  @UseGuards(GqlJwtGuardGuard)
  createDepartment(@Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput) {
    if (!createDepartmentInput.subdepartments) {
      createDepartmentInput.subdepartments = [];
    }
    return this.departmentsService.create(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Query(() => Department, { name: 'department' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Mutation(() => Department)
  updateDepartment(@Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput) {
    return this.departmentsService.update(updateDepartmentInput.id, updateDepartmentInput);
  }

  @Mutation(() => Department)
  removeDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentsService.remove(id);
  }
}
