import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
