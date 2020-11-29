import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export default class NgWord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  word: string

  @Column({ default: true })
  enable: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
