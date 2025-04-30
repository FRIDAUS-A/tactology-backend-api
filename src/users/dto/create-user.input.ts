import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ description: 'username for user', nullable: false })
  @IsString()
  username: string;

  @Field({ description: 'password for user', nullable: false })
  @IsString()
  password: string;
}
