import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller, Get, HttpCode, Param, Patch, Post, Req
} from '@nestjs/common'

import { TodoService } from '../services/todo.service.js'
import {
  todoCompletedResponse,
  todoCreatedResponse,
  todoGetAllNonActivatedOfUserResponse,
  todoGetAllOfUserResponse, todoPatchResponse
} from '../docs/todo-response.docs.js'
import { TodoCreateDto } from '../dtos/todo-create.dto.js'
import { TodoCreatedTransformer, type TodoCreatedTransformerType } from '../transformers/todo-created.transformer.js'
import { Request } from '../../auth/guards/auth.guard.js'
import { Permission } from '../../permissions/permission.enum.js'
import { Permissions } from '../../permissions/permissions.decorator.js'
import { TodoIndexTransformer, type TodoIndexTransformerType } from '../transformers/todo-index.transformer.js'
import { TodoUpdateDto } from '../dtos/todo-update.dto.js'
import { TodoUpdatedTransformer, type TodoUpdatedTransformerType } from '../transformers/todo-updated.transformer.js'

@ApiTags('Todo')
@Controller('Todo')
export class TodoController {
  constructor (private readonly todoService: TodoService) {
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse(todoCreatedResponse)
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
  @ApiOkResponse(todoGetAllNonActivatedOfUserResponse)
  @Permissions(Permission.TODO_READ)
  async getAllNonCompletedByUserUuid (@Req() req: Request): Promise<TodoIndexTransformerType[]> {
    const todos = await this.todoService.getAllNonCompletedByUserUuid(req.auth.user.uuid)
    return new TodoIndexTransformer().array(todos)
  }

  @Patch('/:uuid')
  @HttpCode(200)
  @ApiOkResponse(todoPatchResponse)
  @Permissions(Permission.TODO_UPDATE)
  async update (@Param('uuid') uuid: string, @Body() dto: TodoUpdateDto, @Req() req: Request): Promise<TodoUpdatedTransformerType> {
    const todo = await this.todoService.update(uuid, dto, req.auth.user.uuid)
    return new TodoUpdatedTransformer().item(todo)
  }

  @Post('/complete/:uuid')
  @HttpCode(200)
  @ApiOkResponse(todoCompletedResponse)
  @Permissions(Permission.TODO_UPDATE)
  async complete (@Param('uuid') uuid: string, @Req() req: Request): Promise<TodoIndexTransformerType> {
    const todo = await this.todoService.completeTodo(uuid, req.auth.user.uuid)
    return new TodoIndexTransformer().item(todo)
  }
}
