import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { StoreItemEntity } from './model/store-item.entity';
import { CreateEntityInput } from './model/create-entity-input.type';
import { UpdateEntityInput } from './model/update-entity-input.type';
import { FindAllQuery } from './model/find-all-query.type';
import { FindOneQuery } from './model/find-one-query.type';
import { SEED_DATA_TOKEN } from './model/constant';

@Injectable()
export class DBService {
  private store: Map<string, StoreItemEntity[]> = new Map();

  constructor(
    @Inject(SEED_DATA_TOKEN)
    private readonly seedData: Record<string, StoreItemEntity[]>,
  ) {
    this.store = new Map(Object.entries(this.seedData));
  }

  create<EntityModel extends StoreItemEntity>(
    entityName: string,
    input: CreateEntityInput<EntityModel>,
  ): EntityModel {
    const entityModel = {
      ...input,
      id: randomUUID(),
    } as EntityModel;

    this.getEntityByStoreName<EntityModel>(entityName).push(entityModel);
    return entityModel;
  }

  findAll<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindAllQuery<EntityModel> = {},
  ): EntityModel[] {
    const { limit, sortBy } = query;
    const results = this.getEntityByStoreName<EntityModel>(entityName);

    if (sortBy) {
      results.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }
    if (limit) {
      return results.slice(0, limit);
    }
    return results;
  }

  findOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindOneQuery<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntityByStoreName<EntityModel>(entityName);
    return entities.find((entity) => {
      const isMatchingFilter = Object.keys(query).every(
        (key) => entity[key] === query[key],
      );
      return isMatchingFilter;
    });
  }

  deleteOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindOneQuery<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntityByStoreName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(query).every((key) => entity[key] === query[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const deletedEntity = entities[entityIndex];
    entities.splice(entityIndex, 1);
    return deletedEntity;
  }

  updateOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
    updatedInput: UpdateEntityInput<EntityModel>,
  ) {
    const entities = this.getEntityByStoreName<EntityModel>(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });

    if (entityIndex == -1) {
      return undefined;
    }

    const updatedEntity = { ...entities[entityIndex], ...updatedInput };
    entities[entityIndex] = updatedEntity;
    return updatedEntity;
  }

  private getEntityByStoreName<EntityModel extends StoreItemEntity>(
    entityName: string,
  ) {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }
    return this.store.get(entityName) as EntityModel[];
  }
}
