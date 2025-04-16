import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number): Task {
    const task = this.tasks.find((t, index) => index === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  update(id: number, updateTaskDto: CreateTaskDto): Task {
    const task = this.tasks[id];
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const updated = { ...task, ...updateTaskDto };
    this.tasks[id] = updated;
    return updated;
  }

  delete(id: number): { message: string } {
    const task = this.tasks[id];
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(id, 1);
    return { message: 'Task deleted successfully' };
  }
}
