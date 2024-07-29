import { PostMetadata } from '../../../../components/PostMetadata';
import PostPreview from "../../../../components/PostPreview";
import getPostMetadata from "../../../../components/getPostMetadata";
import getAllTags from '../../../../components/getAllTags';


const allTags = getAllTags();
const tagsSection = (slug: string) => (
  <>
    <ul className="mt-2 flex flex-wrap justify-center gap-1">
      {allTags.map((tag: string) => (
        <li key={tag} className="mr-2">
          <a href={`/blog/tags/${tag}`} className={`rounded-md border-2 px-2 text-slate-700 hover:underline ${tag === slug ? 'border-cyan-500' : ''}`}>{tag}</a>
        </li>
      ))}
    </ul>
  </>
);

const getTagPosts = (tag: string): PostMetadata[] => {
  const posts: PostMetadata[] = getPostMetadata();
  return posts.filter((post) => post.tags?.includes(tag));
};

type TagPageProps = {
  params: {
    slug: string;
  };
};

const TagPage = ({ params }: TagPageProps) => {  
  const { slug } = params;
  const tagPosts = getTagPosts(slug);
  const tagPostPreviews = tagPosts.map((tagPost) => (
    <PostPreview key={tagPost.slug} {...tagPost} />
  ));

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="my-8 text-center text-4xl text-slate-600">
        Blog
      </div>
      <div className="my-4 mx-4 text-center text-slate-600 sm:mx-16 sm:my-10">
        {allTags.length > 0 && tagsSection(slug)}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tagPostPreviews}
      </div>
    </div>
  );
};

export default TagPage;

export async function generateStaticParams() {
  return allTags.map((tag) => ({
    slug: tag,
  }));
}
