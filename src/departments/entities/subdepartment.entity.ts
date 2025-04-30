import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Department } from "./department.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@Entity()
@ObjectType()
export class SubDepartment {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Department, department => department.subdepartments, { onDelete: 'CASCADE'})
  @JoinColumn({ name: "departmentId" })
  @Field(() => Department)  // Expose the related department to GraphQL
  department: Department;

  constructor(subdepartment?: Partial<SubDepartment>) {
    if (subdepartment) {
      Object.assign(this, subdepartment);
    }
  }
}
