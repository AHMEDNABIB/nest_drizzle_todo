import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todos.dto';
import { UpdateTodoDto } from './dto/update-todos.dto';
import { TodosService } from './todos.service';
import { UsersGuard } from '../users/users.guard';
@Controller('todos')
@UseGuards(UsersGuard)
export class TodosController {
  constructor(private readonly todoService: TodosService) {}
  @Get()
  getData() {
    return this.todoService.getAllTodos();
  }

  @Post()
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    return this.todoService.createTodos(createTodoDto);
  }

  @Get(':id')
  getTodo(@Param('id') id: number) {
    //   console.log(id)
    return this.todoService.getTodos(id);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodos(id, updateTodoDto);
  }

  @Delete(':id')
  softDeleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodos(id);
  }
}
