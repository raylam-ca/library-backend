import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';

@UseGuards(RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(['admin'])
  @ApiOperation({ summary: 'Create a new task', description: 'Only users with the "admin" role can create tasks.' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Only admin users can create tasks.' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks', description: 'Retrieves a list of all existing tasks.' })
  @ApiResponse({ status: 200, description: 'List of tasks retrieved successfully.', type: [CreateTaskDto] })
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single task by ID', description: 'Retrieve a specific task using its unique identifier.' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task to retrieve' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    // Retrieve a Task instance by ID
    console.log(id);
  }
}
