// department.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubDepartment } from './subdepartment.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';


@Entity()
@ObjectType()  
export class Department {
  @PrimaryGeneratedColumn()
  @Field()  
  id: number;

  @Column()
  @Field()  
  @MinLength(2)
  name: string;

  @OneToMany(() => SubDepartment, subdepartment => subdepartment.department, { cascade: true, eager: true})
  @Field(() => [SubDepartment]) 
  subdepartments?: SubDepartment[];

  constructor(department: Partial<Department>) {
    Object.assign(this, department);
  }
}
