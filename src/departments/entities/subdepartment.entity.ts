import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Department } from "./department.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity()
@ObjectType()  // Mark SubDepartment as a GraphQL object type
export class SubDepartment {
  @PrimaryGeneratedColumn()
  @Field()  // Expose id to GraphQL
  id: number;

  @Column()
  @Field()  // Expose name to GraphQL
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
