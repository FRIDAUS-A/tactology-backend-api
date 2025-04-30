import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@ObjectType()
export class Subdepartment {
  @Field(() => Int)
  id: number;

  @Field()
  @MinLength(2)
  name: string

  @Field(() => Int)
  departmentId: number
}
