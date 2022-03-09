import { Arg, Field, Int, ObjectType, Query, Resolver } from 'type-graphql'
import { User } from '../models/user'
import { getConnection } from 'typeorm'

@ObjectType()
class PaginatedUsers {
  @Field(() => [User])
  users: User[]
  @Field()
  hasMore: boolean
}

@Resolver(User)
export class UserResolver {
  @Query(() => PaginatedUsers)
  async users(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
  ): Promise<PaginatedUsers> {
    // 20 -> 21
    const realLimit = Math.min(50, limit)
    const reaLimitPlusOne = realLimit + 1

    const replacements: any[] = [reaLimitPlusOne]

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)))
    }

    const users = await getConnection().query(
      `
                select u.*
                from user u
                    ${cursor ? `where p."createdAt" < $2` : ''}
                order by u."createdAt" DESC
                    limit $1
            `,
      replacements,
    )

    return {
      users: users.slice(0, realLimit),
      hasMore: users.length === reaLimitPlusOne,
    }
  }
}
