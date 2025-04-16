import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CoreModule,
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
