import { CreateEntityInput } from "src/db/model/create-entity-input.type"
import { CreateHabitDto } from "src/habits/dto/create-habit.dto"
import { HabitEntity } from "../entity/habit.entity"

export const mapCreateHabitDtoToCreateEntityInput = (
  createHabitDto: CreateHabitDto
): CreateEntityInput<HabitEntity> =>{
  const now = new Date().getDate.toString()
  return {
    ...createHabitDto,
    habitId: new Date().getTime(),
    createdAt: now,
    updatedAt: now
  }
}