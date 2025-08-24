import { Module } from '@nestjs/common';
import { DBService } from './db.service';
import { SeedDataProvider } from './model/seed-data.provider';

@Module({
  providers: [DBService, SeedDataProvider],
  exports: [DBService],
})
export class DBModule {}
