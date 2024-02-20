import PostSkeleton from "src/Components/Skeleton/PostSkeleton";
import PostList from "src/Components/PostCard/PostList";
import useSavesContext from "src/hooks/useSavesContext";

const Saves = () => {
  const { posts: savedPosts, isPending } = useSavesContext();
  if (isPending) <PostSkeleton />;
  return <>{<PostList isSaves={true} posts={savedPosts} />}</>;
};

export default Saves;
