import { type ApiResponseOptions } from '@nestjs/swagger'
import { TodoCreatedTransformerType } from '../transformers/todo-created.transformer.js'
import { TodoIndexTransformerType } from '../transformers/todo-index.transformer.js'

export const todoCreatedResponse: ApiResponseOptions = {
  status: 201,
  description: 'The todo has been successfully been created',
  type: TodoCreatedTransformerType
}

export const todoGetAllOfUserResponse: ApiResponseOptions = {
  status: 200,
  description: 'The todos have been successfully been retrieved',
  type: TodoIndexTransformerType,
  isArray: true
}

export const todoGetAllNonActivatedOfUserResponse: ApiResponseOptions = {
  status: 200,
  description: 'The todos have been successfully been retrieved',
  type: TodoIndexTransformerType,
  isArray: true
}

export const todoPatchResponse: ApiResponseOptions = {
  status: 200,
  description: 'The todo has been successfully been updated',
  type: TodoIndexTransformerType
}

export const todoCompletedResponse: ApiResponseOptions = {
  status: 200,
  description: 'The todo has been successfully been marked as complete',
  type: TodoIndexTransformerType
}
