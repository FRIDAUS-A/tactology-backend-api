import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubdepartmentsService } from './subdepartments.service';
import { Subdepartment } from './entities/subdepartment.entity';
import { CreateSubdepartmentInput } from './dto/create-subdepartment.input';
import { UpdateSubdepartmentInput } from './dto/update-subdepartment.input';
import { SubDepartment } from 'src/departments/entities/subdepartment.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuardGuard } from 'src/auth/guards/gql-jwt-guard/gql-jwt-guard.guard';

@Resolver(() => SubDepartment)
export class SubdepartmentsResolver {
  constructor(private readonly subdepartmentsService: SubdepartmentsService) {}

  @Mutation(() => Subdepartment)
  @UseGuards(GqlJwtGuardGuard)
  createSubdepartment(@Args('createSubdepartmentInput') createSubdepartmentInput: CreateSubdepartmentInput) {
    return this.subdepartmentsService.create(createSubdepartmentInput);
  }

  @Query(() => [Subdepartment], { name: 'subdepartments' })
  @UseGuards(GqlJwtGuardGuard)
  findAll() {
    return this.subdepartmentsService.findAll();
  }

  @Query(() => Subdepartment, { name: 'subdepartment' })
  @UseGuards(GqlJwtGuardGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subdepartmentsService.findOne(id);
  }

  @Mutation(() => Subdepartment)
  @UseGuards(GqlJwtGuardGuard)
  updateSubdepartment(@Args('updateSubdepartmentInput') updateSubdepartmentInput: UpdateSubdepartmentInput) {
    return this.subdepartmentsService.update(updateSubdepartmentInput.id, updateSubdepartmentInput);
  }

  @Mutation(() => Subdepartment)
  @UseGuards(GqlJwtGuardGuard)
  removeSubdepartment(@Args('id', { type: () => Int }) id: number) {
    return this.subdepartmentsService.remove(id);
  }
}
