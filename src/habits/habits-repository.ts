import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { randomUUID } from "crypto";
import { DBService } from "src/db/db.service";

@Injectable()
export class HabitsRepository {

  constructor(private readonly db: DBService) {}
  
  findAll(){
    return this.db.findAll("habits");
  }

  createHabit(createHabitInput){
    const newHabit = {
      ...createHabitInput,
      id : new Date().getTime()
    }

    return this.db.create("habits", newHabit);
  }

  findOneHabit(id: string){
    return this.db.findOneBy("habits", {id});
  }

  updateHabit(id: number, updateInput) {
    return this.db.updateOneBy("habits", { id }, updateInput);
  }

  removeHabit(id: number) {
    return this.db.deleteOneBy("habits", { id });
  }
}
