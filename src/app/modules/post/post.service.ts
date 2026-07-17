import { JwtPayload } from "jsonwebtoken";
import { IPost, PostVisibility } from "./post.interface";
import { Post } from "./post.model";

const createPost = async (
  payload: Partial<IPost>,
  decodedToken: JwtPayload,
) => {
  const postPayload = {
    text: payload.text,
    image: payload.image ?? "",
    author: decodedToken.userId,
    visibility: payload.visibility,
  };
  const result = await Post.create(postPayload);

  return result;
};

const getAllPost = async (viewerId: string) => {
  const filter = viewerId
    ? {
        $or: [
          { visibility: PostVisibility.PUBLIC },
          { visibility: PostVisibility.PRIVATE, author: viewerId },
        ],
      }
    : { visibility: PostVisibility.PUBLIC };

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .populate("author", "firstName lastName email");

  const total = await Post.countDocuments(filter);

  return {
    meta: {
      total,
    },
    data: posts,
  };
};

// const getAllPost = async (viewerId: string) => {
//   const filter = viewerId
//     ? {
//         $or: [
//           { visibility: PostVisibility.PUBLIC },
//           { visibility: PostVisibility.PRIVATE, author: viewerId },
//         ],
//       }
//     : { visibility: PostVisibility.PUBLIC };

//   const posts = await Post.find(filter)
//     .sort({ createdAt: -1 })
//     .populate("author", "firstName lastName email")
//     .lean();

//   const total = await Post.countDocuments(filter);

//   // No logged-in viewer -> nothing can be "liked by me".
//   if (!viewerId || posts.length === 0) {
//     return {
//       meta: { total },
//       data: posts.map((post) => ({ ...post, likedByMe: false })),
//     };
//   }

//   // ONE query for all of this viewer's likes across every post in this
//   // page, instead of a separate PostLike.findOne() per post.
//   const likedPostIds = await PostLike.find({
//     user: viewerId,
//     post: { $in: posts.map((p) => p._id) },
//   }).distinct("post");

//   const likedSet = new Set(likedPostIds.map((id) => id.toString()));

//   const data = posts.map((post) => ({
//     ...post,
//     likedByMe: likedSet.has(post._id.toString()),
//   }));

//   return {
//     meta: { total },
//     data,
//   };
// };

const getMyPosts = async (decodedToken: JwtPayload) => {
  console.log(decodedToken);
  const posts = await Post.find({ author: decodedToken.userId }).populate(
    "author",
    "firstName lastName email",
  );
  return posts;
};

export const PostServices = {
  createPost,
  getAllPost,
  getMyPosts,
};
