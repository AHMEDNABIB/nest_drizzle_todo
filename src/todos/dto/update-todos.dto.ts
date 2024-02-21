import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todos.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
