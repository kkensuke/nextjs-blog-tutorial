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
          className={`group flex items-center gap-1 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200 hover:shadow-md ${tag === slug ? 'bg-cyan-100 text-cyan-700' : ''}`}
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
    <div className="mx-auto max-w-screen-md">
      <div className="relative my-10 text-center">
        <h1 className="relative z-10 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text pb-2 text-5xl font-bold text-transparent">
          <Link href="/blog"> Blog </Link>
        </h1>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Pencil 
            size={120} 
            className="rotate-12 text-slate-100" 
          />
        </div>
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
