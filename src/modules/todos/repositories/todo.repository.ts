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

  async update (todo: Todo): Promise<void> {
    await this.repository.update({ uuid: todo.uuid }, todo)
  }

  async findAllByUserUuid (userUuid: string): Promise<Todo[]> {
    return await this.repository.find({
      where: { userUuid }
    })
  }

  async findAllNonCompletedByUserUuid (userUuid: string): Promise<Todo[]> {
    return await this.repository.find({
      where: { userUuid, isCompleted: false },
      order: { deadline: 'ASC' }
    })
  }

  async findOneOrFail (uuid: string): Promise<Todo> {
    return await this.repository.findOneOrFail({ where: { uuid } })
  }
}
