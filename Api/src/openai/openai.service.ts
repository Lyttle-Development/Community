import { Injectable } from '@nestjs/common';

const { Configuration, OpenAIApi } = require('openai');

@Injectable()
export class OpenaiService {
  private openai: any;

  constructor(
    @Inject(forwardRef(() => ))
  ) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(configuration);
  }
}
