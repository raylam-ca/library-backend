import {
  Query,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';

@UseGuards(RolesGuard)
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  //@Roles(['admin'])
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Only users with the "admin" role can create tasks.'
  })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Only admin users can create tasks.' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Retrieves a list of all existing tasks. You can filter by title, description, and completed status.',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    type: String,
    description: 'Filter tasks by title (partial match allowed)',
  })
  @ApiQuery({
    name: 'description',
    required: false,
    type: String,
    description: 'Filter tasks by description (partial match allowed)',
  })
  @ApiQuery({
    name: 'completed',
    required: false,
    type: Boolean,
    description: 'Filter tasks by completion status (true or false)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
    type: [CreateTaskDto],
  })
  async findAll(
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('completed') completed?: string,
  ): Promise<Task[]> {
    const isCompleted = completed !== undefined ? completed === 'true' : undefined;
    return this.tasksService.findAll({ title, description, completed: isCompleted });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single task by ID',
    description: 'Retrieve a specific task using its unique identifier.'
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task to retrieve' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  //@Roles(['admin'])
  @ApiOperation({
    summary: 'Update an existing task by ID',
    description: 'Only users with the "admin" role can update tasks. Provide the task ID and updated details.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task to update' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  //@Roles(['admin'])
  @ApiOperation({
    summary: 'Delete a task by ID',
    description: 'Only users with the "admin" role can delete tasks. Provide the task ID to remove it from the system.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the task to delete' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.delete(id);
  }
}
