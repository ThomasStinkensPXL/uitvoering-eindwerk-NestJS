import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../repositories/todo.repository.js'
import { type TodoCreateDto } from '../dtos/todo-create.dto.js'
import { Todo } from '../entities/todo.entity.js'
import { type TodoUpdateDto } from '../dtos/todo-update.dto.js'
import { KnownError } from '../../../utils/Exceptions/errors.js'

@Injectable()
export class TodoService {
  constructor (private readonly todoRepository: TodoRepository) {
  }

  async create (dto: TodoCreateDto, userUuid: string): Promise<Todo> {
    const todo = new Todo()
    todo.title = dto.title
    todo.description = dto.description
    todo.deadline = dto.deadline
    todo.userUuid = userUuid
    todo.isCompleted = false
    todo.completedAt = null

    return await this.todoRepository.save(todo)
  }

  async getAllByUserUuid (userUuid: string): Promise<Todo[]> {
    return await this.todoRepository.findAllByUserUuid(userUuid)
  }

  async getAllNonCompletedByUserUuid (userUuid: string): Promise<Todo[]> {
    return await this.todoRepository.findAllNonCompletedByUserUuid(userUuid)
  }

  async update (uuid: string, dto: TodoUpdateDto, userUuid: string): Promise<Todo> {
    const todo = await this.todoRepository.findOneOrFail(uuid)

    if (todo.isCompleted) {
      throw new KnownError('forbidden').setDesc('The todo is already completed and cannot be updated.')
    }

    if (todo.userUuid !== userUuid) {
      throw new KnownError('user_is_not_owner_of_resource')
    }

    todo.description = dto.description ?? todo.description
    todo.deadline = dto.deadline ?? todo.deadline
    todo.title = dto.title ?? todo.title

    await this.todoRepository.update(todo)

    return todo
  }
}
