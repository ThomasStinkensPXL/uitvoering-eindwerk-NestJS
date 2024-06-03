import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller, Get, HttpCode, Post, Req
} from '@nestjs/common'

import { TodoService } from '../services/todo.service.js'
import { todoCreatedResponse, todoGetAllOfUserResponse } from '../docs/todo-response.docs.js'
import { TodoCreateDto } from '../dtos/todo-create.dto.js'
import { TodoCreatedTransformer, type TodoCreatedTransformerType } from '../transformers/todo-created.transformer.js'
import { Request } from '../../auth/guards/auth.guard.js'
import { Permission } from '../../permissions/permission.enum.js'
import { Permissions } from '../../permissions/permissions.decorator.js'
import { TodoIndexTransformer, type TodoIndexTransformerType } from '../transformers/todo-index.transformer.js'

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

  @Get('/user')
  @HttpCode(200)
  @ApiOkResponse(todoGetAllOfUserResponse)
  @Permissions(Permission.TODO_READ)
  async getAllByUserUuid (@Req() req: Request): Promise<TodoIndexTransformerType[]> {
    const todos = await this.todoService.getAllByUserUuid(req.auth.user.uuid)
    return new TodoIndexTransformer().array(todos)
  }

  @Get('/user/non-completed')
  @HttpCode(200)
  @ApiOkResponse(todoGetAllOfUserResponse)
  @Permissions(Permission.TODO_READ)
  async getAllNonCompletedByUserUuid (@Req() req: Request): Promise<TodoIndexTransformerType[]> {
    const todos = await this.todoService.getAllNonCompletedByUserUuid(req.auth.user.uuid)
    return new TodoIndexTransformer().array(todos)
  }
}
