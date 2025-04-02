import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export default class IndicacaoService {
  async get() {
    return await prisma.indicacao.findMany();
  }

  async post(data) {
    return await prisma.indicacao.create({
      data,
    });
  }
}
