import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ITokensPair } from 'src/infrastructure/types/jwt/tokensPair';
import { TokensPair } from 'src/tokens/models/tokenPair.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  role: string;

  @Field(() => TokensPair)
  tokens: ITokensPair;
}
