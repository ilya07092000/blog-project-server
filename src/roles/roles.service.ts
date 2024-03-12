import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ROLES } from 'src/common/constants/roles';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  getRoleIdByName(role: keyof typeof ROLES) {
    return this.prisma.role.findFirst({
      where: {
        type: role,
      },
    });
  }
}
