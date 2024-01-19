import { IPostResponse } from "src/types";

const sortPosts = (posts: IPostResponse[]) => {
  return posts?.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
};

export default sortPosts;
