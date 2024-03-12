import { Injectable } from '@nestjs/common';
import { BasicDAO } from 'src/infrastructure/contracts/BasicDAO';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { NewUserInput } from './dto/new-user.input';

@Injectable()
export class UsersRepository extends BasicDAO<UserDto> {
  constructor(private prismaService: PrismaService) {
    super({ dto: new UserDto() });
  }

  async getByEmail(email: string) {
    const data = await this.prismaService.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        password: true,
        role: {
          select: {
            type: true,
            id: true,
          },
        },
      },
    });

    return this.makeDto(data);
  }

  async create(data: NewUserInput & { roleId: number }) {
    const result = await this.prismaService.user.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        role_id: data.roleId,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        password: true,
        role: {
          select: {
            type: true,
          },
        },
      },
    });

    return this.makeDto(result);
  }
}
