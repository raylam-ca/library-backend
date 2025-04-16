import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  create(task: Task) {
    this.tasks.push(task);
  }

  findAll(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }
}
