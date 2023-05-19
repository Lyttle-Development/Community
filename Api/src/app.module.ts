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
import { MemberModuleLevelDayModule } from './member-module-level-day/member-module-level-day.module';
import { GuildModuleVoiceGrowthModule } from './guild-module-voice-growth/guild-module-voice-growth.module';
import { DiscordOauthStrategy } from './auth/discord-oauth.strategy';
import { DiscordOauthModule } from './auth/discord-oauth.module';
import { JwtAuthModule } from './auth/jwt-auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordOauthModule,
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
    MemberModuleLevelDayModule,
    GuildModuleVoiceGrowthModule,
    JwtAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DiscordOauthStrategy],
})
export class AppModule {}
