import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DepartmentsModule } from './departments/departments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubdepartmentsModule } from './subdepartments/subdepartments.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, DepartmentsModule, GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    context: ({ req, res }) => ({ req, res }),
  }), UsersModule, AuthModule, SubdepartmentsModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
