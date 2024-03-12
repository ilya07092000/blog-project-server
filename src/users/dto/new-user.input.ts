import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
