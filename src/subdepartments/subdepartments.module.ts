import { Module } from '@nestjs/common';
import { SubdepartmentsService } from './subdepartments.service';
import { SubdepartmentsResolver } from './subdepartments.resolver';
import { SubDepartment } from 'src/departments/entities/subdepartment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/departments/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubDepartment, Department])],
  providers: [SubdepartmentsResolver, SubdepartmentsService],
})
export class SubdepartmentsModule {}
