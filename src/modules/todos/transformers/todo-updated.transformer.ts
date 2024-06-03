import { ApiProperty } from '@nestjs/swagger'
import { Transformer } from '@appwise/transformer'
import { type Todo } from '../entities/todo.entity.js'

export class TodoUpdatedTransformerType {
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
}

export class TodoUpdatedTransformer extends Transformer<Todo, TodoUpdatedTransformerType> {
  transform (todo: Todo): TodoUpdatedTransformerType {
    return {
      uuid: todo.uuid,
      userUuid: todo.userUuid,
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline
    }
  }
}
