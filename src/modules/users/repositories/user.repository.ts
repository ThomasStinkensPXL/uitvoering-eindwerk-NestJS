import { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { User } from '../entities/user.entity.js'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor (@InjectEntityManager() entityManager: EntityManager) {
    super(User, entityManager)
  }

  async findOneByUuidOrFail (uuid: string): Promise<User> {
    return await this.findOneOrFail({ where: { uuid } })
  }

  async updateUser (user: User): Promise<void> {
    await this.update(user.uuid, user)
  }
}
