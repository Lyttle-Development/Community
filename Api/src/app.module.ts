import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
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
import { MemberModuleLevelDayModule } from './member-module-level-day/member-module-level-day.module';
import { GuildModuleVoiceGrowthModule } from './guild-module-voice-growth/guild-module-voice-growth.module';
import { DiscordOauthStrategy } from './auth/discord-oauth.strategy';
import { DiscordOauthModule } from './auth/discord-oauth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DiscordGuard } from './auth/discord.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.HOST,
        port: parseInt(process.env.TYPEORM_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // 1. https://www.google.com/search?q=what+does+synchronize+do+nestjs
        // - synchronize: Indicates if database schema should be auto-created on every application launch
        //
        // 2. https://docs.nestjs.com/techniques/database#:~:text=WARNING,lose%20production%20data.
        // - Setting "synchronize: true" shouldn't be used in production - otherwise you can lose production data.
        synchronize: false,
      }),
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
    MemberModuleLevelDayModule,
    GuildModuleVoiceGrowthModule,
    DiscordOauthModule,
  ],
  controllers: [AppController],
  providers: [
    DiscordOauthStrategy,
    {
      provide: APP_GUARD,
      useClass: DiscordGuard,
    },
  ],
})
export class AppModule {}
