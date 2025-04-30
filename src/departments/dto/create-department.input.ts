import { InputType, Field } from '@nestjs/graphql';
import { CreateSubDepartmentInput } from './create-subdepartment.input';
import { IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateDepartmentInput {
  @Field({ description: 'Name for department' })
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true, description: 'List of subdepartments' })
  @ValidateNested({ each: true })
  @Type(() => CreateSubDepartmentInput)
  @IsOptional()
  subdepartments?: CreateSubDepartmentInput[];
}
