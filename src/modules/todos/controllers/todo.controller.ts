import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller, HttpCode, Post, Req
} from '@nestjs/common'

import { TodoService } from '../services/todo.service.js'
import { todoCreatedResponse } from '../docs/todo-response.docs.js'
import { TodoCreateDto } from '../dtos/todo-create.dto.js'
import { TodoCreatedTransformer, type TodoCreatedTransformerType } from '../transformers/todo-created.transformer.js'
import { Request } from '../../auth/guards/auth.guard.js'
import { Permission } from '../../permissions/permission.enum.js'
import { Permissions } from '../../permissions/permissions.decorator.js'

@ApiTags('Todo')
@Controller('Todo')
export class TodoController {
  constructor (private readonly todoService: TodoService) {
  }

  @Post()
  @HttpCode(201)
  @ApiOkResponse(todoCreatedResponse)
  @Permissions(Permission.TODO_CREATE)
  async create (@Body() dto: TodoCreateDto, @Req() req: Request): Promise<TodoCreatedTransformerType> {
    const newTodo = await this.todoService.create(dto, req.auth.user.uuid)
    return new TodoCreatedTransformer().item(newTodo)
  }
}
