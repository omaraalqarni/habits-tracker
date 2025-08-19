import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HabitsService } from '../habits.service';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { UpdateHabitDto } from '../dto/update-habit.dto';
import { CreateHabitInput } from '../models/create-habit.input';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitService: HabitsService) {}
  @Get()
  getAllHabits(
    @Query('limit') limit: string,
    @Query('sort_by') sortBy: 'habitName' | 'id',
  ) {
    const limitNumber = limit ? +limit : undefined;
    return this.habitService.findAllHabits({ limit: limitNumber, sortBy });
  }

  @Get(':id')
  getHabitById(@Param('id') id: string) {
    const habit = this.habitService.findOneHabit(+id);
    if (!habit) {
      throw new HttpException('habit not found', HttpStatus.NOT_FOUND);
    }
    return habit;
  }

  @Post()
  createNewHabit(@Body() newHabit: CreateHabitDto): CreateHabitInput {
    return this.habitService.createHabit(newHabit);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    const habit = this.habitService.remove(+id);
    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() input: UpdateHabitDto,
  ): UpdateHabitInput {
    const habit = this.habitService.updateHabit(+id, input);
    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }
}
