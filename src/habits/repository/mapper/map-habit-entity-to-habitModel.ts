import { HabitEntity } from '../entity/habit.entity';
import { HabitModel } from '../../service/models/habits.model';

export const MapHabitEntityToHabitModel = (
  entity?: HabitEntity,
): HabitModel | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    habitId: entity.habitId,
    habitName: entity.habitName,
    description: entity.description!,
  };
};
