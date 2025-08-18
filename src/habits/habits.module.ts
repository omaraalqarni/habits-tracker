import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { HabitsRepository } from './habits-repository';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  providers: [HabitsService, HabitsRepository],
  controllers: [HabitsController]
})
export class HabitsModule {}
