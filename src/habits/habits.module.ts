import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { InMemHabitsRepository } from './in-mem-habits-repository.ts';
import { DBService } from 'src/db/db.service';

@Module({
  imports: [DBService],
  providers: [HabitsService, InMemHabitsRepository],
  controllers: [HabitsController]
})
export class HabitsModule {}
