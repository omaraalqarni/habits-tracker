import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { HabitsRepository } from "./habits-repository.js";

@Injectable()
export class HabitsService {
  constructor(private readonly repository: HabitsRepository) {}

  findAllHabits() {
    return this.repository.findAll();
  }
  
  createHabit(newHabitInput){
    return this.repository.createHabit(newHabitInput);
  }

  findOneHabit(id: string){
    return this.repository.findOneHabit(id);
  }

   remove(id: number) {
    return this.repository.removeHabit(id);
  }


  updateHabit(id: number, input: string){
    return this.repository.updateHabit(id, input);
  }
}
