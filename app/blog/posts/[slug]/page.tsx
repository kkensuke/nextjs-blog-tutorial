import fs from "fs";
import matter from "gray-matter";
import rehypeSlug from 'rehype-slug'; // rehype plugin to add id attributes to headings so that they can be linked to
import Markdown from 'react-markdown';
import { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
// import rehypeMathjax from 'rehype-mathjax';
import React from "react";

import { Suspense } from 'react';
import { FEATURES } from '@/config/constants';
import Comment from "@/components/blog/Comment/Comment";
import Loading from '@/components/common/Loading';
import ErrorBoundary from "@/components/common/ErrorBoundary";
import getPostMetadata from "@/lib/blog/getPostMetadata";
import TOC from "@/components/blog/TableOfContents/index";
import Pre from "@/components/blog/CodeBlock";
import CustomImage from "@/components/blog/Image";
import AdmonitionComponents from "@/components/blog/Admonition/admonitionColor1";
// import AdmonitionComponents from "@/components/blog/Admonition/admonitionColor2"; // Alternative Admonition style
import { remarkTextDirectives, TextDirectiveComponents } from '@/components/blog/Admonition/directive';

import { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';

const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = getPostContent(params.slug);
  const postUrl = `${SITE_CONFIG.url}/blog/posts/${params.slug}`;
  
  const imageUrl = post.data.previewImage 
    ? post.data.previewImage.startsWith('http')
      ? post.data.previewImage
      : `${SITE_CONFIG.url}${post.data.previewImage}`
    : SITE_CONFIG.ogImage;

  return {
    title: post.data.title,
    description: post.data.subtitle || post.data.title,
    keywords: post.data.tags || [],
    authors: [{ name: SITE_CONFIG.name }],
    openGraph: {
      title: post.data.title,
      description: post.data.subtitle || post.data.title,
      type: 'article',
      publishedTime: post.data.date,
      authors: [SITE_CONFIG.name],
      tags: post.data.tags || [],
      url: postUrl,
      images: [
        {
          url: imageUrl,
          alt: post.data.title,
        },
      ],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}


const PostContent = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  
  // Define your components with proper typing
  const components: Components = {
    p: React.Fragment,
    img: CustomImage as Components['img'],
    pre: Pre,
    ...AdmonitionComponents,
    ...TextDirectiveComponents,
  };
  
  const titleSection = (
    <>
      <p className="mt-2 text-right text-slate-600">{post.data.date}</p>
      <h1 className="text-2xl text-slate-600">{post.data.title}</h1>
      <p className="mt-2 text-slate-600">{post.data.subtitle}</p>
      {/* if post.data.tags exist, return list of tags below */}
      {post.data.tags && (
        <ul className="mt-2 flex flex-wrap justify-center gap-1">
          {post.data.tags.map((tag: string) => (
            <li key={tag} className="mr-2">
              <a href={`/blog/tags/${tag}`} className="group flex items-center gap-1 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200 hover:shadow-md">{tag}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
  
  return (
    <div className="mb-20 flex flex-col lg:flex-row lg:items-start">
      
      <div className="lg:order-1 lg:w-96 lg:min-w-[10px] lg:shrink">
      </div>
      
      <div className="mx-auto my-12 max-w-screen-sm text-center lg:order-2 lg:hidden">
        {titleSection}
      </div>
      
      <div className="lg:sticky lg:top-10 lg:order-3 lg:ml-8 lg:mr-0 lg:w-80 lg:shrink-0">
          <div className="mx-auto max-w-[400px] lg:mt-10">
            <TOC />
          </div>
      </div>
      
      <div className="lg:order-2 lg:mx-auto lg:shrink-0">
        <div className="mx-auto my-12 hidden max-w-screen-sm text-center lg:block"> {/* hidden lg:block  <-> lg:hidden */}
          {titleSection}
        </div>
        
        <ErrorBoundary fallback={
          <div className="prose mx-auto p-6 text-center">
            <h3>Failed to render post content</h3>
            <p>We encountered an error while rendering this post's content.</p>
          </div>
        }>
          <article className="post prose mx-auto">
            <Markdown
              children={post.content}
              remarkPlugins={[
                remarkGfm,
                remarkDirective,
                remarkDirectiveRehype,
                remarkTextDirectives,
                remarkMath
              ]}
              rehypePlugins={[
                rehypeSlug,
                rehypeKatex
                // rehypeMathjax
              ]}
              components={components}
            />
          </article>
        </ErrorBoundary>
      </div>
      
    </div>
  );
};

export default function PostPage(props: any) {
  return (
    <>
      <Suspense fallback={<Loading fullWidth text="Loading post..." />}>
        <PostContent {...props} />
      </Suspense>
      
      <div className="mb-28">
        {FEATURES.ENABLE_COMMENTS && <Comment />}
      </div>
    </>
  );
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
};
