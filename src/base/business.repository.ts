import { DeleteResult, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { MethodNotAllowedException } from '@nestjs/common';

export class BusinessRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
  async delete(): Promise<DeleteResult> {
    throw new MethodNotAllowedException();
  }

  async assertOrFail(id: number, ...fields: (keyof Entity)[]): Promise<Entity> {
    return this.findOne(id, {
      select: ['id', ...fields],
    });
  }
}
