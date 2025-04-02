import { Body, Controller, Get, Post } from '@nestjs/common';
import IndicacaoService from './indicacao.service';

@Controller('/indicacao')
export default class IndicacaoController {
  constructor(private readonly service: IndicacaoService) {}

  @Get()
  async get() {
    return await this.service.get();
  }

  @Post()
  async post(@Body() data: any) {
    return await this.service.post(data);
  }
}
