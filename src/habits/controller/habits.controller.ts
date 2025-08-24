import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HabitsService } from '../service/habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { HabitsDTO } from './dto/habits.dto';
import { mapHabitModelToHabitDto } from './mapper/map-habit-model-to-habit-dto';
import { mapUpdateHabitModelToUpdateEntityInput } from '../repository/mapper/map-updateHabitDto-to-updateHabitEntity';
import { mapCreateHabitInputToCreatEntityInput } from '../repository/mapper/map-createHabitModel-to-createEnitiyInput';
import { UpdateHabitInput } from '../service/models/update-habit.input';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitService: HabitsService) {}
  @Get()
  async findAllHabits(
    @Query('limit') limit: string,
    @Query('sort_by') sortBy: 'habitName' | 'id',
  ): Promise<HabitsDTO[]> {
    const limitNumber = limit ? +limit : undefined;
    const habits = await this.habitService.findAllHabits({
      limit: limitNumber,
      sortBy: sortBy,
    });

    return habits.map((habit) => mapHabitModelToHabitDto(habit)!);
  }

  @Get(':id')
  async getHabitById(@Param('id') id: string): Promise<HabitsDTO | undefined> {
    const habit = await this.habitService.findOneHabit(+id);
    if (!habit) {
      throw new HttpException('habit not found', HttpStatus.NOT_FOUND);
    }
    return mapHabitModelToHabitDto(habit);
  }

  @Post()
  async createNewHabit(@Body() newHabit: CreateHabitDto): Promise<HabitsDTO> {
    const habit = await this.habitService.createHabit(
      mapCreateHabitInputToCreatEntityInput(newHabit),
    );
    return mapHabitModelToHabitDto(habit)!;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<HabitsDTO | undefined> {
    const habit = await this.habitService.remove(+id);
    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }
    return mapHabitModelToHabitDto(habit);
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateHabitDto,
  ): Promise<HabitsDTO | undefined> {
    const habit = await this.habitService.updateHabit(
      mapUpdateHabitModelToUpdateEntityInput(input),
    );
    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return mapHabitModelToHabitDto(habit);
  }
}
