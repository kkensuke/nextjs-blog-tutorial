import React from 'react';
import Link from 'next/link';
import { Bookmark, Pencil } from 'lucide-react';
import getPostMetadata from "@/lib/blog/getPostMetadata";
import getAllTags from "@/lib/blog/getAllTags";
import PostPreview from "@/components/blog/preview/PostPreview";

const BlogPage = () => {
  const allTags = getAllTags();
  const posts = getPostMetadata();

  const TagSection = () => (
    <div className="flex flex-wrap justify-center gap-2">
      {allTags.map((tag: string) => (
        <a
          key={tag}
          href={`/blog/tags/${tag}`}
          className="group flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200 hover:shadow-md"
        >
          <Bookmark size={14} className="opacity-60 group-hover:opacity-100" />
          {tag}
        </a>
      ))}
    </div>
  );

  return (
    <div className="mx-auto mb-20 mt-12 max-w-screen-md">
      <div className="mb-8 flex items-center gap-3">
        <Pencil className="text-slate-600" size={32} />
        <h1 className="bg-clip-text text-4xl font-bold text-slate-700">
          <Link href="/blog"> Blog </Link>
        </h1>
        <div className="h-px flex-1 bg-slate-200"></div>
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