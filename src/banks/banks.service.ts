import { Injectable } from '@nestjs/common';

@Injectable()
export class BanksService {
  findAll() {
    return `This action returns all banks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bank`;
  }
}
