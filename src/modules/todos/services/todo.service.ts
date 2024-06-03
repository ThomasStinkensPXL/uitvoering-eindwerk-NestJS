import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { TodoRepository } from '../repositories/todo.repository.js'
import { type TodoCreateDto } from '../dtos/todo-create.dto.js'
import { Todo } from '../entities/todo.entity.js'
import { type TodoUpdateDto } from '../dtos/todo-update.dto.js'
import { KnownError } from '../../../utils/Exceptions/errors.js'
import { UserRepository } from '../../users/repositories/user.repository.js'

@Injectable()
export class TodoService {
  constructor (
    private readonly todoRepository: TodoRepository,
    private readonly dataSource: DataSource
  ) {
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
      throw new KnownError('forbidden').setDesc('A completed todo cannot be updated.')
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

  async completeTodo (uuid: string, userUuid: string): Promise<Todo> {
    return await this.dataSource.transaction(async (manager) => {
      const todoRepository = new TodoRepository(manager)
      const userRepository = new UserRepository(manager)

      const todo = await todoRepository.findOneOrFail(uuid)
      const user = await userRepository.findOneByUuidOrFail(userUuid)

      if (todo.userUuid !== userUuid) {
        throw new KnownError('user_is_not_owner_of_resource')
      }

      if (todo.isCompleted) {
        throw new KnownError('todo_already_completed')
      }

      const completionDate = new Date()

      todo.isCompleted = true
      todo.completedAt = completionDate

      user.lastCompletionDate = completionDate

      await todoRepository.update(todo)
      await userRepository.updateUser(user)

      return todo
    })
  }
}
