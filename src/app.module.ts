import { Module,MiddlewareConsumer } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  TasksModule]
})
export class AppModule {
}
