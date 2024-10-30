import React from 'react';
import Link from 'next/link';
import { Bookmark, Pencil } from 'lucide-react';
import getPostMetadata from "../../components/getPostMetadata";
import PostPreview from "../../components/PostPreview";
import getAllTags from "../../components/getAllTags";

const BlogPage = () => {
  const allTags = getAllTags();
  const posts = getPostMetadata();

  const TagSection = () => (
    <div className="flex flex-wrap justify-center gap-2">
      {allTags.map((tag: string) => (
        <a
          key={tag}
          href={`/blog/tags/${tag}`}
          className="group flex items-center gap-1 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200 hover:shadow-md"
        >
          <Bookmark size={14} className="opacity-60 group-hover:opacity-100" />
          {tag}
        </a>
      ))}
    </div>
  );

  return (
    <div className="mx-auto mb-20 max-w-screen-md">
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

      {allTags.length > 0 && (
        <div className="">
          <TagSection />
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;