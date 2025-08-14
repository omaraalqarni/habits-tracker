import { Body, Controller, Get, Post } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitService: HabitsService) {}
  
  @Get()
  getAllHabits()  {
    return this.habitService.findAllHabits();
  }

  @Post()
  createNewHabit(@Body() newHabit){
    return this.habitService.createHabit(newHabit);
  }
}
