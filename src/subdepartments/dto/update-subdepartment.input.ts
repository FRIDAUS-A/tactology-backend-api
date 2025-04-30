import { InputType, Int, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateSubdepartmentInput {
  @Field(() => Int)
  id: number
  
  @Field()
  @MinLength(2)
  name: string;

  @Field(() => Int)
  departmentId: number;
}

