import { BusinessRepository } from './business.repository';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DeepPartial, DeleteResult, EntityTarget, getConnection, QueryRunner, UpdateResult } from 'typeorm';
import { BusinessEntity } from './business.entity';

export class BusinessService<Entity extends BusinessEntity<Entity>> {
  entityName: string;
  Record: any;

  constructor(protected repository: BusinessRepository<Entity>) {
    this.Record = this.repository.target;
    this.entityName = this.repository.metadata.name.toLowerCase();
  }

  findAll(...relations: string[]) {
    return this.repository.find({
      relations,
    });
  }

  async findOne(id: number, ...relations: (keyof Entity)[]): Promise<Entity> {
    this.checkNullId(id);
    const record = await this.repository.findOne(id, { relations: relations as string[] });
    this.checkNotFound(record);
    return record;
  }

  findByIds(ids: number[], ...relations: string[]) {
    return this.repository.findByIds(ids, { relations });
  }

  async assertOrFail(id: number, ...fields: (keyof Entity)[]): Promise<Entity> {
    if (!id) {
      return undefined;
    }
    const record = await this.repository.assertOrFail(id, ...fields);
    this.checkNotFound(record);
    return record;
  }

  async assertOrFailTransactional(
    entityClass: EntityTarget<Entity>,
    id: number,
    queryRunner: QueryRunner,
    ...fields: (keyof Entity)[]
  ): Promise<Entity> {
    if (!id) {
      return undefined;
    }
    const record = await queryRunner.manager.findOne(entityClass, id, {
      select: ['id', ...fields],
    });
    this.checkNotFound(record);
    return record;
  }

  async assertManyOrFail(ids: number[], ...fields: (keyof Entity)[]) {
    return Promise.all(ids.map((id) => this.assertOrFail(id, ...fields)));
  }

  async delete(id: number, deletedBy: any, queryRunner?: QueryRunner) {
    this.checkNullId(id);
    await this.assertOrFail(id);
    const record = new this.Record();
    record.id = id;
    record.deletedAt = new Date();
    record.updateById = deletedBy?.userId || null;
    let result;
    if (queryRunner) {
      result = await queryRunner.manager.save(record);
    } else {
      result = await this.repository.save(record);
    }
    this.checkNotFound(result);
  }

  async updateById(
    id: number,
    updateData: DeepPartial<Entity>,
    member: any,
    queryRunner?: QueryRunner,
  ): Promise<Entity> {
    this.checkNullId(id);
    await this.assertOrFail(id);
    const record = new this.Record();
    record.id = id;
    if (member) {
      record.updatedById = member.userId;
    }
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        record[key] = value;
      }
    }
    try {
      if (queryRunner) {
        return queryRunner.manager.save(record);
      }
      return this.repository.save(record);
    } catch (e) {
      this.handleUpsertException(e);
    }
  }

  async save(entity: DeepPartial<Entity>, member: any, queryRunner?: QueryRunner): Promise<Entity> {
    const record = new this.Record();
    if (entity.id) {
      record.updateById = member?.userId;
    } else {
      record.createdById = member?.userId;
    }
    for (const [key, value] of Object.entries(entity)) {
      if (value !== undefined) {
        record[key] = value;
      }
    }

    try {
      if (queryRunner) {
        return queryRunner.manager.save(record);
      }
      return await this.repository.save(record);
    } catch (e) {
      this.handleUpsertException(e);
    }
  }

  checkAffected(result: UpdateResult | DeleteResult) {
    if (!result.affected) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
  }

  checkNotFound(entity: Entity) {
    if (!entity) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
  }

  async initiateTransaction() {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  private checkNullId(id: number) {
    if (!id) {
      throw new NotFoundException(`${this.entityName} not found`);
    }
  }

  async findOneTransactional(entity: EntityTarget<Entity>, id: number, queryRunner: QueryRunner): Promise<Entity> {
    return await queryRunner.manager.findOne(entity, id);
  }

  handleUpsertException(e: any) {
    switch (e.code) {
      case '23505':
        throw new ConflictException(e.message);
      case '22003':
        throw new UnprocessableEntityException(
          `مقدار ${e?.parameters?.length ? e.parameters[0] : 'وارد شده'} بیش از حد مجاز است.`,
        );
      default:
        throw new InternalServerErrorException(e.message);
    }
  }
}
