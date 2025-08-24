import { UpdateHabitInput } from '../../service/models/update-habit.input';
import { UpdateEntityInput } from '../../../db/model/update-entity-input.type';
import { HabitEntity } from '../entity/habit.entity';

export const mapUpdateHabitModelToUpdateEntityInput = (
  updateHabitInput: UpdateHabitInput,
): UpdateEntityInput<HabitEntity> => {
  return {
    ...updateHabitInput,
    updatedAt: new Date().getDate().toString(),
  };
};
