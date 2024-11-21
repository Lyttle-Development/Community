import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
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
import { MigrateModule } from './db_migration/migrate/migrate.module';
import migrationDatabaseConfig from './migration.database';
import primaryDatabaseConfig from './primary.database';
import { Migrate } from './db_migration/migrate/entities/migrate.entity';
import { ServerModule } from './db_migration/server/server.module';
import { ServerCountToNumberModule } from './db_migration/server-count-to-number/server-count-to-number.module';
import { ServerEasterEggModule } from './db_migration/server-easter-egg/server-easter-egg.module';
import { ServerEventModule } from './db_migration/server-event/server-event.module';
import { ServerLevelModule } from './db_migration/server-level/server-level.module';
import { ServerUserModule } from './db_migration/server-user/server-user.module';
import { ServerUserLevelModule } from './db_migration/server-user-level/server-user-level.module';
import { ServerVoiceGrowthModule } from './db_migration/server-voice-growth/server-voice-growth.module';
import { ServerVoiceGrowthChildModule } from './db_migration/server-voice-growth-child/server-voice-growth-child.module';
import { ServerUserDailyActivityModule } from './db_migration/server-user-daily-activity/server-user-daily-activity.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        orphanedTypes: [Discord, GuildStatResolved, OpenAi, Migrate],
      },
      cors: {
        credentials: true,
        origin: 'https://community.lyttledevelopment.com',
      },
    }),
    // Primary database
    TypeOrmModule.forRootAsync({
      useFactory: () => primaryDatabaseConfig,
    }),
    // Migration database
    TypeOrmModule.forRootAsync({
      name: 'migration',
      useFactory: () => migrationDatabaseConfig,
    }),

    // Primary database
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

    // Migration database
    MigrateModule,
    ServerModule,
    ServerCountToNumberModule,
    ServerEasterEggModule,
    ServerEventModule,
    ServerLevelModule,
    ServerUserModule,
    ServerUserDailyActivityModule,
    ServerUserLevelModule,
    ServerVoiceGrowthModule,
    ServerVoiceGrowthChildModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    DiscordOauthStrategy,
    {
      provide: APP_GUARD,
      useClass: DiscordGuard,
    },
  ],
})
export class AppModule {}
