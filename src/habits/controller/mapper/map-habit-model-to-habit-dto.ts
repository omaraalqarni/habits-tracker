import { HabitsDTO } from '../dto/habits.dto';
import { HabitModel } from '../../service/models/habits.model';

export const mapHabitModelToHabitDto = (
  habit: HabitModel,
): HabitsDTO | undefined => {
  if (!habit) {
    return undefined;
  }
  return {
    id: habit.habitId,
    habitName: habit.habitName,
    description: habit.description!,
  };
};
