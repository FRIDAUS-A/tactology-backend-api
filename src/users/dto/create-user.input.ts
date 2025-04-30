import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'username for user', nullable: false })
  username: string;

  @Field({ description: 'password for user', nullable: false })
  password: string;
}
