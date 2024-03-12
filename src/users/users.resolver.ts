import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { NewUserInput } from './dto/new-user.input';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/infrastructure/exceptions/http-exception.filter';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseFilters(new HttpExceptionFilter())
  @Mutation(() => User)
  createUser(@Args('userData') userData: NewUserInput) {
    const userDto = new NewUserInput();
    Object.assign(userDto, userData);

    return this.usersService.create(userDto);
  }

  @Mutation(() => User)
  async login(@Args('userData') userData: LoginUserInput) {
    const result = await this.usersService.login(userData);
    return result;
  }
}
