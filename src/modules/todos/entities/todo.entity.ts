import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { User } from '../../users/entities/user.entity.js'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column({ type: 'uuid' })
  userUuid: string

  @ManyToOne(() => User, user => user.todos)
  user: Relation<User>

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'varchar' })
  description: string

  @Column({ type: 'timestamp', precision: 3 })
  deadline: Date

  @Column({ type: 'boolean' })
  isCompleted: boolean

  @Column({ type: 'timestamp', precision: 3, nullable: true })
  completedAt: Date | null
}
