import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'id for the user', nullable: false })
  id: number;

  @Field({description: 'username for the user', nullable: false })
  username: string;

  @Field({description: 'password for the user', nullable: false })
  password: string;
}
