import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [HabitsModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
