import { InputType, Field, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field(() => Int)
  id: number
  
  @Field({ description: 'Name for department' })
  @MinLength(2)
  name: string;
}
