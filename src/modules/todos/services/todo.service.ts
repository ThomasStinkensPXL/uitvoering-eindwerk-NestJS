import { Injectable } from '@nestjs/common'
import { TodoRepository } from '../repositories/todo.repository.js'
import { type TodoCreateDto } from '../dtos/todo-create.dto.js'
import { Todo } from '../entities/todo.entity.js'

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
}
