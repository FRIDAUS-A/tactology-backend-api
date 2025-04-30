import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field(() => Int, { description: 'id of user', nullable: false })
  id: number;

  @Field({description: 'jwt access token for user', nullable: false })
  accessToken: string;
}
