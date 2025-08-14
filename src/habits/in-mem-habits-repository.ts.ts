import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { randomUUID } from "crypto";

@Injectable()
export class InMemHabitsRepository {
  private habits : any = [];
  

  findAll(){
    return this.habits;
  }

  createHabit(createHabitInput){
    const newHabit = {
      ...createHabitInput,
      id : randomUUID()
    }
    this.habits.push(newHabit);
    return newHabit;
  }
}
