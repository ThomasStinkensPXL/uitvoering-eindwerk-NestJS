import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation
} from 'typeorm'
import { Todo } from '../../modules/todos/entities/todo.entity.js'

@Entity()
export class TodoUser {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @CreateDateColumn({ type: 'varchar' })
  username: string

  @Column({ type: 'varchar' })
  firstName: string

  @Column({ type: 'varchar' })
  lastName: string

  @Column({ type: 'varchar' })
  emailAddress: string

  @Column({ type: 'timestamp' })
  lastCompletionDate: Date

  @OneToMany(() => Todo, todo => todo.user)
  todos?: Array<Relation<Todo>>
}
