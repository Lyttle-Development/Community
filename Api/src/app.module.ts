import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModule } from './guild/guild.module';
import { MemberModule } from './member/member.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { GuildTranslationModule } from './guild-translation/guild-translation.module';
import { GuildMessageModule } from './guild-message/guild-message.module';
import { GuildModuleLevelModule } from './guild-module-level/guild-module-level.module';
import { GuildModuleQotdModule } from './guild-module-qotd/guild-module-qotd.module';
import { MemberModuleLevelModule } from './member-module-level/member-module-level.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GuildModule,
    MemberModule,
    UserModule,
    ProfileModule,
    GuildTranslationModule,
    GuildMessageModule,
    GuildModuleLevelModule,
    GuildModuleQotdModule,
    MemberModuleLevelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
