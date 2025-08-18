import { Injectable } from "@nestjs/common";

@Injectable()
export class DBService {
  private store: Map<string, any> = new Map();
  
  create(entityName: string, input) {
    this.getEntityByStoreName(entityName).push(input);
    return input;
  }

  findAll(entityName: string) {
    return this.getEntityByStoreName(entityName);
  }

  findOneBy(entityName: string, filter: { [key: string]: any }) {
    const entities = this.getEntityByStoreName(entityName)
    return entities.find((entity) => {
       const isMatchingFilter = Object.keys(filter).every(
        (key) => entity[key] === filter[key]
      );
      return isMatchingFilter;
    });
  }

   deleteOneBy(entityName: string, filter: { [key: string]: any }) {
    const entities = this.getEntityByStoreName(entityName);
    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const deletedEntity = entities[entityIndex];
    entities.splice(entityIndex, 1);
    return deletedEntity;
  }


  updateOneBy(entityName: string, filter: {[key: string]: any}, updatedInput: any) {
    const entities = this.getEntityByStoreName(entityName);
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

  private getEntityByStoreName(entityName: string){
    if (!this.store.has(entityName)) {
      this.store.set(entityName, [])
    }
    return this.store.get(entityName) as any[];
  }

}
