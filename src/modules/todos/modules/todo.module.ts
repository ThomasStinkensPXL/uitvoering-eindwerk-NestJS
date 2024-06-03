import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '../../users/repositories/user.repository.js'
import { TodoService } from '../services/todo.service.js'
import { TodoRepository } from '../repositories/todo.repository.js'
import { TodoController } from '../controllers/todo.controller.js'
import { Todo } from '../entities/todo.entity.js'

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo])
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    TodoRepository,

    UserRepository
  ],
  exports: [TodoRepository]
})

export class TodoModule {}
