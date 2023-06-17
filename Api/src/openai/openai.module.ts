import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiResolver } from './openai.resolver';

@Module({
  providers: [OpenaiResolver, OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
