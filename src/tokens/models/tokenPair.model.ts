import { Field, ObjectType } from '@nestjs/graphql';
import { ITokensPair } from 'src/infrastructure/types/jwt/tokensPair';

@ObjectType()
export class TokensPair implements ITokensPair {
  @Field()
  access: string;

  @Field()
  refresh: string;
}
