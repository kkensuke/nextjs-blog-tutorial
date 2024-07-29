import { PostMetadata } from '../../../../components/PostMetadata';
import PostPreview from "../../../../components/PostPreview";
import getPostMetadata from "../../../../components/getPostMetadata";


const getTagPosts = (tag: string): PostMetadata[] => {
  const posts = getPostMetadata();
  return posts.filter((post) => post.tags?.includes(tag));
};

type TagPageProps = {
  params: {
    slug: string;
  };
};

const TagPage = ({ params }: TagPageProps) => {
  const { slug } = params;
  const posts = getTagPosts(slug);

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="my-8 text-center text-4xl text-slate-600">
        <h1>Posts tagged with "{slug}"</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
};

export default TagPage;

export async function generateStaticParams() {
  const posts = getPostMetadata();
  const tags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  return tags.map((tag) => ({
    slug: tag,
  }));
}
