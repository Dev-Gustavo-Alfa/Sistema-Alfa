import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import CaptacaoDto from './dto/captacao.dto';
const prisma = new PrismaClient();

@Injectable()
export default class CaptacaoService {
  async get() {
    return await prisma.captacao_geral.findMany();
  }

  async post(captacao: any) {
    return await prisma.captacao_geral.create({
      data: { ...captacao },
    });
  }

  async put(id: string, captacao: any) {
    if (isNaN(+id) || !id.trim().length) {
      throw new BadRequestException({ error: 'invalid id, should be number' });
    }
    return await prisma.captacao_geral.update({
      where: { id: +id },
      data: { ...captacao },
    });
  }
}
