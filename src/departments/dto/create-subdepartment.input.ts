import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateSubDepartmentInput {
  @Field({ description: 'Name for department' })
  @MinLength(2)
  name: string;
}
