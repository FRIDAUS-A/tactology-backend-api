import { InputType, Field } from '@nestjs/graphql';
import { CreateSubDepartmentInput } from './create-subdepartment.input';
import { MinLength } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field({ description: 'Name for department' })
  @MinLength(2)
  name: string;

  @Field(() => [CreateSubDepartmentInput], { description: 'List of subdepartments' })
  subdepartments: CreateSubDepartmentInput[];
}
