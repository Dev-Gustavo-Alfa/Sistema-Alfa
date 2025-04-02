import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CaptacaoModule from './captacao/captacao.module';
import IndicacaoModule from './indicacao/indicacao.module';

@Module({
  imports: [CaptacaoModule, IndicacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
