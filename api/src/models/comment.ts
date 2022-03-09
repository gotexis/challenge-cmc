import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'
import { Post } from './post'

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  text!: string

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  creator: User
}
