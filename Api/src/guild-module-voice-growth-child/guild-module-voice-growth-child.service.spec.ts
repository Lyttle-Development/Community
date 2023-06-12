import { Test, TestingModule } from '@nestjs/testing';
import { GuildModuleVoiceGrowthChildService } from './guild-module-voice-growth-child.service';

describe('GuildModuleVoiceGrowthChildService', () => {
  let service: GuildModuleVoiceGrowthChildService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildModuleVoiceGrowthChildService],
    }).compile();

    service = module.get<GuildModuleVoiceGrowthChildService>(
      GuildModuleVoiceGrowthChildService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
