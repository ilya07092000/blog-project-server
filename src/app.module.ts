import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { TokensService } from './tokens/tokens.service';
import { TokensModule } from './tokens/tokens.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    JwtModule.register({
      global: true,
    }),
    UsersModule,
    ConfigModule.forRoot(),
    RolesModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesService, TokensService],
})
export class AppModule {}
