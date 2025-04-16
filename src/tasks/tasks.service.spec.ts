import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [
        {
          title: 'Task 1',
          description: 'Task 1 Description',
          completed: false,
        },
      ];
      //@ts-ignore
      tasksService.tasks = result;

      await expect(tasksService.findAll()).resolves.toBe(result);
    });
  });

  describe('create', () => {
    it('should add a new task', async () => {
      const task: Task = {
        title: 'Task 1',
        description: 'Task 1 Description',
        completed: false,
      };
      const expectedTaskArray = [task];
      //@ts-ignore
      expect(tasksService.tasks).toStrictEqual([]);

      tasksService.create(task);
      //@ts-ignore
      expect(tasksService.tasks).toStrictEqual(expectedTaskArray);
    });
  });
});
