import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { HabitsRepository } from '../repository/habits-repository';
import { HabitsDTO } from '../controller/dto/habits.dto';
import { HabitModel } from './models/habits.model';
import { CreateHabitInput } from './models/create-habit.input';
import { UpdateHabitInput } from './models/update-habit.input';

@Injectable()
export class HabitsService {
  constructor(private readonly repository: HabitsRepository) {}

  findAllHabits(query: {
    limit?: number;
    sortBy?: 'habitName' | 'id';
  }): HabitModel[] | Promise<HabitModel[]> {
    const limit = query.limit ?? 10;
    const sortBy = query.sortBy ?? 'habitName';
    return this.repository.findAll({ limit, sortBy });
  }

  createHabit(
    newHabitInput: CreateHabitInput,
  ): HabitModel | Promise<HabitModel> {
    return this.repository.createHabit(newHabitInput);
  }

  findOneHabit(
    id: number,
  ): HabitModel | undefined | Promise<HabitModel | undefined> {
    return this.repository.findHabitById(id);
  }

  remove(id: number): HabitModel | undefined | Promise<HabitModel | undefined> {
    return this.repository.removeHabit(id);
  }

  updateHabit(
    input: UpdateHabitInput,
  ): HabitModel | undefined | Promise<HabitModel | undefined> {
    return this.repository.updateHabit(input);
  }
}
