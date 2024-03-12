import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RolesService } from './roles.service';

@Module({
  providers: [PrismaService, RolesService],
  exports: [PrismaService, RolesService],
})
export class RolesModule {}
