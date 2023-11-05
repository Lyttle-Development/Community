import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildModule } from './db_primary/guild/guild.module';
import { MemberModule } from './db_primary/member/member.module';
import { UserModule } from './db_primary/user/user.module';
import { UserProfileModule } from './db_primary/user-profile/user-profile.module';
import { GuildTranslationModule } from './db_primary/guild-translation/guild-translation.module';
import { GuildMessageModule } from './db_primary/guild-message/guild-message.module';
import { GuildModuleLevelModule } from './db_primary/guild-module-level/guild-module-level.module';
import { GuildModuleQotdModule } from './db_primary/guild-module-qotd/guild-module-qotd.module';
import { MemberModuleLevelModule } from './db_primary/member-module-level/member-module-level.module';
import { MemberModuleLevelDayModule } from './db_primary/member-module-level-day/member-module-level-day.module';
import { GuildModuleVoiceGrowthModule } from './db_primary/guild-module-voice-growth/guild-module-voice-growth.module';
import { DiscordOauthStrategy } from './db_primary/auth/discord-oauth.strategy';
import { DiscordOauthModule } from './db_primary/auth/discord-oauth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DiscordGuard } from './auth/discord.guard';
import { GuildModuleVoiceGrowthChildModule } from './guild-module-voice-growth-child/guild-module-voice-growth-child.module';
import { GuildActionModule } from './guild-action/guild-action.module';
import { GuildModuleBirthdayModule } from './guild-module-birthday/guild-module-birthday.module';
import { GuildModuleCountToNumberModule } from './guild-module-count-to-number/guild-module-count-to-number.module';
import { GuildModuleEasterEggModule } from './guild-module-easter-egg/guild-module-easter-egg.module';
import { DiscordModule } from './discord/discord.module';
import { Discord } from './discord/entities/discord.entity';
import { OpenAiModule } from './open-ai/open-ai.module';
import { GuildStatResolved } from './guild-stat-resolved/entities/guild-stat-resolved.entity';
import { GuildStatModule } from './guild-stat/guild-stat.module';
import { GuildStatResolvedModule } from './guild-stat-resolved/guild-stat-resolved.module';
import { OpenAi } from './open-ai/entities/open-ai.entity';
import { DiscordGuard } from './db_primary/auth/discord.guard';
import { GuildModuleVoiceGrowthChildModule } from './db_primary/guild-module-voice-growth-child/guild-module-voice-growth-child.module';
import { GuildActionModule } from './db_primary/guild-action/guild-action.module';
import { GuildModuleBirthdayModule } from './db_primary/guild-module-birthday/guild-module-birthday.module';
import { GuildModuleCountToNumberModule } from './db_primary/guild-module-count-to-number/guild-module-count-to-number.module';
import { GuildModuleEasterEggModule } from './db_primary/guild-module-easter-egg/guild-module-easter-egg.module';
import { DiscordModule } from './db_primary/discord/discord.module';
import { Discord } from './db_primary/discord/entities/discord.entity';
import { OpenAiModule } from './db_primary/open-ai/open-ai.module';
import { GuildStatResolved } from './db_primary/guild-stat-resolved/entities/guild-stat-resolved.entity';
import { GuildStatModule } from './db_primary/guild-stat/guild-stat.module';
import { GuildStatResolvedModule } from './db_primary/guild-stat-resolved/guild-stat-resolved.module';
import { OpenAi } from './db_primary/open-ai/entities/open-ai.entity';

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
        orphanedTypes: [Discord, GuildStatResolved, OpenAi, Migrate],
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
    UserProfileModule,
    GuildTranslationModule,
    GuildMessageModule,
    GuildModuleLevelModule,
    GuildModuleQotdModule,
    MemberModuleLevelModule,
    MemberModuleLevelDayModule,
    GuildModuleVoiceGrowthModule,
    DiscordOauthModule,
    GuildModuleVoiceGrowthChildModule,
    GuildActionModule,
    GuildModuleBirthdayModule,
    GuildModuleCountToNumberModule,
    GuildModuleEasterEggModule,
    DiscordModule,
    GuildStatModule,
    GuildStatResolvedModule,
    OpenAiModule,
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
