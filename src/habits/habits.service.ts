import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { HabitsRepository } from './repository/habits-repository.js';
import { HabitsDTO } from './dto/habits.dto.js';
import { UpdateHabitDto } from './dto/update-habit.dto.js';
import { HabitModel } from './models/habits.model';
import { CreateHabitInput } from './models/create-habit.input';
import { CreateHabitDto } from './dto/create-habit.dto';

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

  createHabit(newHabitInput: CreateHabitDto): HabitsDTO | Promise<HabitsDTO> {
    return this.repository.createHabit(newHabitInput);
  }

  findOneHabit(
    id: number,
  ): HabitsDTO | Promise<HabitsDTO | undefined> | undefined {
    return this.repository.findHabitById(id);
  }

  remove(id: number): HabitsDTO | undefined | Promise<HabitsDTO | undefined> {
    return this.repository.removeHabit(id);
  }

  updateHabit(
    id: number,
    input: UpdateHabitInput,
  ): HabitsDTO | undefined | Promise<HabitsDTO | undefined> {
    return this.repository.updateHabit(id, input);
  }
}
