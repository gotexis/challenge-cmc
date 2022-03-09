import DataLoader from 'dataloader'
import { Comment } from '../models/comment'

// [1, 78, 8, 9]
export const createCommentLoader = () =>
  new DataLoader<number, Comment>(async (commentIds) => {
    const comments = await Comment.findByIds(commentIds as number[])
    const commentIdToComment: Record<number, Comment> = {}
    comments.forEach((u) => {
      commentIdToComment[u.id] = u
    })

    const sortedComments = commentIds.map((commentId) => commentIdToComment[commentId])
    // console.log("commentIds", commentIds);
    // console.log("map", commentIdTocomment);
    // console.log("sortedcomments", sortedcomments);
    return sortedComments
  })
