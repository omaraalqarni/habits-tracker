import { Injectable } from '@nestjs/common';

export class DBService {
  private store: Map<string, any> = new Map();
  
  create(entityName: string, input) {
    this.getEntityByStoreName(entityName).push(input);
    return input;
  }

  findAll(entityName: string) {
    return this.getEntityByStoreName(entityName);
  }

  private getEntityByStoreName(entityName: string){
    if (!this.store.has(entityName)) {
      this.store.set(entityName, [])
    }
    return this.store.get(entityName) as any[];
  }

}
