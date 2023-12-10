import { Module } from '@nestjs/common';
import { CustomLogger} from '../CustomLogger/customLogger.service';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService,CustomLogger],
  exports: [CustomLogger],
})
export class TasksModule {}
