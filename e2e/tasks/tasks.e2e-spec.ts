import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TasksModule } from '../../src/tasks/tasks.module';
import { TasksService } from '../../src/tasks/tasks.service';
import { CoreModule } from '../../src/core/core.module';

describe('Tasks', () => {
  const tasksService = { findAll: () => ['test'] };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TasksModule, CoreModule],
    })
      .overrideProvider(TasksService)
      .useValue(tasksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET tasks`, () => {
    return request(app.getHttpServer()).get('/tasks').expect(200).expect({
      data: tasksService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
