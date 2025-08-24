import { CreateHabitInput } from '../../service/models/create-habit.input';
import { CreateEntityInput } from '../../../db/model/create-entity-input.type';
import { HabitEntity } from '../entity/habit.entity';

export const mapCreateHabitInputToCreatEntityInput = (
  createHabitInput: CreateHabitInput,
): CreateEntityInput<HabitEntity> => {
  const now = new Date();
  return {
    ...createHabitInput,
    habitId: now.getTime(),
    createdAt: now.getDate().toString(),
    updatedAt: now.getDate().toString(),
  };
};
