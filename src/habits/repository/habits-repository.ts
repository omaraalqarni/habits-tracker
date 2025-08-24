import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DBService } from 'src/db/db.service';
import { HabitEntity } from './entity/habit.entity';
import { HabitsDTO } from '../controller/dto/habits.dto';
import { MapHabitEntityToHabitModel } from './mapper/map-habit-entity-to-habitModel';
import { UpdateHabitDto } from '../controller/dto/update-habit.dto';
import { mapCreateHabitInputToCreatEntityInput } from './mapper/map-createHabitModel-to-createEnitiyInput';
import { mapUpdateHabitModelToUpdateEntityInput } from './mapper/map-updateHabitDto-to-updateHabitEntity';
import { HabitModel } from '../service/models/habits.model';
import { CreateHabitInput } from '../service/models/create-habit.input';
import { UpdateHabitInput } from '../service/models/update-habit.input';

@Injectable()
export class HabitsRepository {
  constructor(private readonly db: DBService) {}

  findAll(query: {
    limit?: number;
    sortBy?: 'habitName' | 'id';
  }): HabitModel[] {
    const habitsEntities = this.db.findAll<HabitEntity>('habits', query);

    return habitsEntities.map(
      (habitEntity) => MapHabitEntityToHabitModel(habitEntity)!,
    );
  }

  createHabit(createHabitInput: CreateHabitInput): HabitModel {
    const habitEntity = this.db.create<HabitEntity>(
      'habits',
      mapCreateHabitInputToCreatEntityInput(createHabitInput),
    );
    return MapHabitEntityToHabitModel(habitEntity)!;
  }

  findHabitById(id: number): HabitModel | undefined {
    const habit = this.db.findOneBy<HabitEntity>('habits', { habitId: id });
    return MapHabitEntityToHabitModel(habit)!;
  }

  updateHabit(updateInputInput: UpdateHabitInput): HabitModel | undefined {
    const habit = this.db.updateOneBy<HabitEntity>(
      'habits',
      { habitId: updateInputInput.habitId },
      mapUpdateHabitModelToUpdateEntityInput(updateInputInput),
    );
    return MapHabitEntityToHabitModel(habit)!;
  }

  removeHabit(id: number): HabitModel | undefined {
    const habit = this.db.deleteOneBy<HabitEntity>('habits', { habitId: id });
    return MapHabitEntityToHabitModel(habit)!;
  }
}
