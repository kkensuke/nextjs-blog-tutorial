import getPostMetadata from "../components/getPostMetadata";
import PostPreview from "../components/PostPreview";
import { PostMetadata } from "../components/PostMetadata";

const HomePage = () => {
  const postMetadata: PostMetadata[] = getPostMetadata();

  // Sort post metadata by date in descending order
  postMetadata.sort((a, b) => {
    // First, compare dates
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    // If dates are the same, compare titles
    return dateComparison === 0 ? a.title.localeCompare(b.title) : dateComparison;
  });
  
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{postPreviews}</div>
    </div>
  );
};

export default HomePage;
