import { HabitsDTO } from "src/habits/dto/habits.dto";
import { HabitEntity } from "../entity/habit.entity";

export const MapHabitEntityToDto = (
  entity?: HabitEntity,
): HabitsDTO | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    id: entity.habitId,
    habitName: entity.habitName,
    description: entity.description!,
  }
}