import { UpdateEntityInput } from "src/db/model/update-entity-input.type";
import { UpdateHabitDto } from "src/habits/dto/update-habit.dto";
import { HabitEntity } from "../entity/habit.entity";


export const mapUpdateHabitDtoToUpdateEntityInput = (
  updateHabitDto: UpdateHabitDto
): UpdateEntityInput<HabitEntity> => {
  return {
    ...updateHabitDto,
    updatedAt: new Date().getDate.toString()
  };
}