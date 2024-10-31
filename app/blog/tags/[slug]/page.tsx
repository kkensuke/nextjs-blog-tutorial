import { PostMetadata } from '../../../../components/PostMetadata';
import { Bookmark, Pencil } from 'lucide-react';
import PostPreview from "../../../../components/PostPreview";
import getPostMetadata from "../../../../components/getPostMetadata";
import getAllTags from '../../../../components/getAllTags';
import Link from 'next/link';


const allTags = getAllTags();
const TagSection = (slug: string) => (
  <>
    <div className="flex flex-wrap justify-center gap-2">
      {allTags.map((tag: string) => (
        <a
          key={tag}
          href={`/blog/tags/${tag}`}
          className={`group flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200 hover:shadow-md ${tag === slug ? 'bg-cyan-100 text-cyan-700' : ''}`}
        >
          <Bookmark size={14} className="opacity-60 group-hover:opacity-100" />
          {tag}
        </a>
      ))}
    </div>
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
    <div className="mx-auto mt-12 max-w-screen-md">
      <div className="mb-8 flex items-center gap-3">
        <Pencil className="text-slate-600" size={32} />
        <h1 className="bg-clip-text text-4xl font-bold text-slate-700">
          <Link href="/blog"> Blog </Link>
        </h1>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>
      <div>
        {allTags.length > 0 && TagSection(slug)}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
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
