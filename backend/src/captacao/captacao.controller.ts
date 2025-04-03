import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import CaptacaoService from './captacao.service';
import CaptacaoDto from './dto/captacao.dto';

@Controller('/captacao')
export default class CaptacaoController {
  constructor(private readonly service: CaptacaoService) {}

  @Get()
  async get() {
    return await this.service.get();
  }

  @Post()
  async post(@Body() captacao: any) {
    return await this.service.post(captacao); // se captado vai para indicação
  }

  @Put('/:id')
  async put(@Param('id') id: string, @Body() captacao: any) {
    console.log(id)
    return await this.service.put(id, captacao);
  }
}
