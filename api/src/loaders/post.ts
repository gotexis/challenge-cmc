import DataLoader from 'dataloader'
import { Post } from '../models/post'

// [1, 78, 8, 9]
// [{id: 1, postname: 'tim'}, {}, {}, {}]
export const createPostLoader = () =>
  new DataLoader<number, Post>(async (postIds) => {
    const posts = await Post.findByIds(postIds as number[])
    const postIdTopost: Record<number, Post> = {}
    posts.forEach((u) => {
      postIdTopost[u.id] = u
    })

    const sortedPosts = postIds.map((postId) => postIdTopost[postId])
    // console.log("postIds", postIds);
    // console.log("map", postIdTopost);
    // console.log("sortedposts", sortedposts);
    return sortedPosts
  })
