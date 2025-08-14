import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [HabitsModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
