import { Test } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/task.interface';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
    tasksController = moduleRef.get<TasksController>(TasksController);
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [
        {
          title: 'Task 1',
          description: 'Task 1 Description',
          completed: false,
        },
      ];
      // @ts-ignore
      tasksService.tasks = tasks;

      expect(await tasksController.findAll()).toBe(tasks);
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

      // @ts-ignore
      expect(tasksService.tasks).toStrictEqual([]);

      await tasksController.create(task);

      // @ts-ignore
      expect(tasksService.tasks).toStrictEqual(expectedTaskArray);
    });
  });
});
