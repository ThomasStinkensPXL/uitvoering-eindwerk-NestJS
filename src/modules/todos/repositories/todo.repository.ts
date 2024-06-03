import { Injectable } from '@nestjs/common'
import { EntityManager, Repository } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import { Todo } from '../entities/todo.entity.js'

@Injectable()
export class TodoRepository {
  private readonly repository: Repository<Todo>
  constructor (@InjectEntityManager() entityManager: EntityManager) {
    this.repository = new Repository(Todo, entityManager)
  }

  async save (todo: Todo): Promise<Todo> {
    return await this.repository.save(todo)
  }

  async findAllByUserUuid (userUuid: string): Promise<Todo[]> {
    return await this.repository.find({
      where: { userUuid }
    })
  }
}
