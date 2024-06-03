import { ApiProperty } from '@nestjs/swagger'
import { Transformer } from '@appwise/transformer'
import { type Todo } from '../entities/todo.entity.js'

export class TodoIndexTransformerType {
  @ApiProperty({ type: String, format: 'uuid' })
  uuid: string

  @ApiProperty({ type: String, format: 'uuid' })
  userUuid: string

  @ApiProperty({ type: String })
  title: string

  @ApiProperty({ type: String })
  description: string

  @ApiProperty({ type: String, format: 'date-time' })
  deadline: Date

  @ApiProperty({ type: Boolean })
  isCompleted: boolean

  @ApiProperty({ type: String, format: 'date-time', nullable: true })
  completedAt: Date | null
}

export class TodoIndexTransformer extends Transformer<Todo, TodoIndexTransformerType> {
  transform (todo: Todo): TodoIndexTransformerType {
    return {
      uuid: todo.uuid,
      userUuid: todo.userUuid,
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline,
      isCompleted: todo.isCompleted,
      completedAt: todo.completedAt
    }
  }
}
