import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitService: HabitsService) {}
  
  @Get()
  getAllHabits()  {
    return this.habitService.findAllHabits();
  }

  @Get(':id')
  getHabitById(@Param('id') id: string){
    const habit = this.habitService.findOneHabit(id);
    if (!habit) {
      throw new HttpException('habit not found',HttpStatus.NOT_FOUND);
    }
    return habit;
  }

  @Post()
  createNewHabit(@Body() newHabit){
    return this.habitService.createHabit(newHabit);
  }
    
  @Delete(":id")
  remove(@Param("id") id: string) {
    const habit = this.habitService.remove(+id);
    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }

   @Patch(":id")
  update(@Param("id") id: string, @Body() input) {
    const habit = this.habitService.updateHabit(+id, input);
    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }

    return habit;
  }

}
