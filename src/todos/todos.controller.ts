import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersGuard } from '../users/users.guard';
import { CreateTodoDto } from './dto/create-todos.dto';
import { UpdateTodoDto } from './dto/update-todos.dto';
import { TodosService } from './todos.service';
@Controller('todos')
@UseGuards(UsersGuard)
export class TodosController {
  constructor(private readonly todoService: TodosService) {}
  @Get()
  getData(@Req() req) {
    // console.log(req.user.userId);
    const id = req.user.userId;
    return this.todoService.getAllTodos(id);
  }

  @Post()
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Req() req) {
    const id = req.user.userId;
    return this.todoService.createTodos(createTodoDto, id);
  }

  @Get(':id')
  getTodo(@Param('id') id: number, @Req() req) {
    const userId = req.user.userId;
    //   console.log(id)
    return this.todoService.getTodos(id, userId);
  }

  @Patch(':id')
  updateTodo(
    @Req() req,
    @Param('id') id: string,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    const userId = req.user.userId;
    return this.todoService.updateTodos(id, updateTodoDto, userId);
  }

  @Delete(':id')
  softDeleteTodo(@Param('id') id: number, @Req() req) {
    const userId = req.user.userId;
    return this.todoService.deleteTodos(id, userId);
  }
}
