import { Test, TestingModule } from '@nestjs/testing';
import { GuildModuleVoiceGrowthChildResolver } from './guild-module-voice-growth-child.resolver';
import { GuildModuleVoiceGrowthChildService } from './guild-module-voice-growth-child.service';

describe('GuildModuleVoiceGrowthChildResolver', () => {
  let resolver: GuildModuleVoiceGrowthChildResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuildModuleVoiceGrowthChildResolver,
        GuildModuleVoiceGrowthChildService,
      ],
    }).compile();

    resolver = module.get<GuildModuleVoiceGrowthChildResolver>(
      GuildModuleVoiceGrowthChildResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
