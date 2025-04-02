import { Module } from '@nestjs/common';
import IndicacaoController from './indicacao.controller';
import IndicacaoService from './indicacao.service';

@Module({
  controllers: [IndicacaoController],
  providers: [IndicacaoService],
})
export default class IndicacaoModule {}
