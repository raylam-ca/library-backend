import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];
  private idCounter = 1

  create(data: CreateTaskDto) {
    const newTask: Task = {
      id: this.idCounter++,
      title: data.title,
      description: data.description,
      completed: data.completed,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  update(id: number, updateTaskDto: CreateTaskDto): Task {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    const updatedTask = { ...this.tasks[taskIndex], ...updateTaskDto };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  delete(id: number): { message: string } {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(taskIndex, 1);
    return { message: 'Task deleted successfully' };
  }
}
