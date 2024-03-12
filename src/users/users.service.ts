import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NewUserInput } from './dto/new-user.input';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { DEFAULT_ROLE } from 'src/common/constants/roles';
import { TokensService } from 'src/tokens/tokens.service';
import { LoginUserInput } from './dto/login-user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private rolesService: RolesService,
    private tokensService: TokensService,
    private usersRepository: UsersRepository,
  ) {}

  async getAll(): Promise<any> {
    return this.prisma.user.findMany();
  }

  async login(userData: LoginUserInput) {
    const userDto = await this.usersRepository.getByEmail(userData.email);
    const tokens = await this.tokensService.generateTokensPair({
      userId: userDto.id,
    });

    return {
      ...userDto.present(),
      tokens,
    };
  }

  async create(userData: NewUserInput) {
    // replace password string with it's hash
    const passwordHash = await this.hashPassword(userData.password);
    userData.password = passwordHash;

    const role = await this.rolesService.getRoleIdByName(DEFAULT_ROLE);
    const userDto = await this.usersRepository.create({
      ...userData,
      roleId: role.id,
    });

    const tokens = await this.tokensService.generateTokensPair({
      userId: userDto.id,
    });

    return {
      ...userDto.present(),
      tokens,
    };
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, +process.env.PASSWORD_HASH_ROUNDS);
  }

  async checkPassword({ password, hash }: { password: string; hash: string }) {
    const hashedPassword = await this.hashPassword(password);
    return hashedPassword === hash;
  }
}
