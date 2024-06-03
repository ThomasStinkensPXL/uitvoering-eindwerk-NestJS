import { type ApiResponseOptions } from '@nestjs/swagger'
import { TodoCreatedTransformerType } from '../transformers/todo-created.transformer.js'

export const todoCreatedResponse: ApiResponseOptions = {
  status: 201,
  description: 'The todo has been successfully been created',
  type: TodoCreatedTransformerType
}
