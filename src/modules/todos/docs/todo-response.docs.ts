import { type ApiResponseOptions } from '@nestjs/swagger'
import { TodoCreatedTransformerType } from '../transformers/todo-created.transformer.js'
import { TodoIndexTransformerType } from '../transformers/todo-index.transformer.js'

export const todoCreatedResponse: ApiResponseOptions = {
  status: 201,
  description: 'The todo has been successfully been created',
  type: TodoCreatedTransformerType
}

export const todoGetAllResponse: ApiResponseOptions = {
  status: 200,
  description: 'The todos have been successfully been retrieved',
  type: TodoIndexTransformerType,
  isArray: true
}
