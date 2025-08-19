import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { randomUUID } from 'crypto';
import { DBService } from 'src/db/db.service';
import { HabitEntity } from './entity/habit.entity';
import { HabitsDTO } from '../dto/habits.dto';
import { MapHabitEntityToDto } from './mapper/map-habit-entity-to-dto';
import { CreateEntityInput } from 'src/db/model/create-entity-input.type';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { UpdateHabitDto } from '../dto/update-habit.dto';
import { mapCreateHabitDtoToCreateEntityInput } from './mapper/map-createHabitDto-to-createHabitEntity copy';
import { mapUpdateHabitDtoToUpdateEntityInput } from './mapper/map-updateHabitDto-to-updateHabitEntity';

@Injectable()
export class HabitsRepository {
  constructor(private readonly db: DBService) {}

  findAll(query: {limit?: number; sortBy?: 'habitName' | 'id'}): HabitsDTO[] {
   const habitsEntities = this.db.findAll<HabitEntity>('habits', query);
   
   return habitsEntities.map(
    (habitEntity) => MapHabitEntityToDto(habitEntity)!
   );
  }

  createHabit(createHabitInput: CreateHabitDto): HabitsDTO {
    const now = new Date();

    

    const habitEntity = this.db.create<HabitEntity>(
      'habits', mapCreateHabitDtoToCreateEntityInput(createHabitInput)
    );
    return MapHabitEntityToDto(habitEntity)!;
  }

  findHabitById(id: number): HabitsDTO  {
    const habit = this.db.findOneBy<HabitEntity>('habits', { habitId: id });
    return MapHabitEntityToDto(habit)!;
  }

  updateHabit(id: number, updateInputDto: UpdateHabitDto): HabitsDTO | undefined{
    const habit = this.db.updateOneBy<HabitEntity>(
      'habits',
      { habitId: id },
      mapUpdateHabitDtoToUpdateEntityInput(updateInputDto),
    );
    return MapHabitEntityToDto(habit)!;
  }

  removeHabit(id: number): HabitsDTO | undefined {
    
    const habit= this.db.deleteOneBy<HabitEntity>('habits', { habitId: id });
    return MapHabitEntityToDto(habit)!
  }
}
