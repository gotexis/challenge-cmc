import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { Post } from '../models/post'
import { getConnection } from 'typeorm'

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[]
  @Field()
  hasMore: boolean
}

@Resolver(Post)
export class PostResolver {
  @Query(() => PaginatedPosts)
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
  ): Promise<PaginatedPosts> {
    // 20 -> 21
    const realLimit = Math.min(50, limit)
    const reaLimitPlusOne = realLimit + 1

    const replacements: any[] = [reaLimitPlusOne]

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)))
    }

    const posts = await getConnection().query(
      `
                select p.*
                from post p
                    ${cursor ? `where p."createdAt" < $2` : ''}
                order by p."createdAt" DESC
                    limit $1
            `,
      replacements,
    )

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === reaLimitPlusOne,
    }
  }
}
