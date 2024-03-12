import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma.service';
import { RolesModule } from 'src/roles/roles.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersService, UsersResolver, PrismaService, UsersRepository],
  imports: [RolesModule, TokensModule],
})
export class UsersModule {}
