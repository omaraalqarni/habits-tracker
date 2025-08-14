import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InMemHabitsRepository } from "./in-mem-habits-repository.ts.js";

@Injectable()
export class HabitsService {
  constructor(private readonly repository: InMemHabitsRepository) {}

  findAllHabits() {
    return this.repository.findAll();
  }
  
  createHabit(newHabitInput){
    return this.repository.createHabit(newHabitInput);
  }
}
