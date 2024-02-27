import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  status: 'inprogress' | 'done' | 'important' | 'trash';

  @IsString()
  tags: string;

  priority: 'Low' | 'Medium' | 'High';

  isDone: boolean;

  isDeleted: boolean;

  isImportant: boolean;
  userId: number;

  //   expired_at?: Date;
}
