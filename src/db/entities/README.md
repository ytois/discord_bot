## Entity

```ts User.ts
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
```

## create record

```ts
// create user
const user = User()
user.name = 'my name'
user.save()
```

## fetch record

```ts
// find all users
User.find().then((users) => {
  console.log(users)
})
```
