import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "../../../../components/getPostMetadata";

import TOC from "../../../../components/toc";
import rehypeSlug from 'rehype-slug'; // rehype plugin to add id attributes to headings so that they can be linked to
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import Pre from "../../../../components/pre";
import CustomImage from "../../../../components/CustomImage";
import AdmonitionComponents from "../../../../components/admonitions";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import React from "react";
// import rehypeMathjax from 'rehype-mathjax';



const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};



const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  
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
              <a href={`/blog/tags/${tag}`} className="rounded-md border-2 px-2 text-slate-700 hover:underline">{tag}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
  
  return (
    <div className="flex flex-col lg:flex-row lg:items-start">
      
      <div className="lg:order-1 lg:w-96 lg:min-w-[10px] lg:shrink">
      </div>
      
      <div className="my-12 mx-auto max-w-screen-sm text-center lg:order-2 lg:hidden">
        {titleSection}
      </div>
      
      <div className="lg:sticky lg:top-0 lg:order-3 lg:mr-0 lg:ml-8 lg:w-80 lg:shrink-0">
          <div className="mx-auto max-w-[400px] lg:mt-10">
            <TOC />
          </div>
      </div>
      
      <div className="lg:order-2 lg:mx-auto lg:shrink-0">
        <div className="my-12 mx-auto hidden max-w-screen-sm text-center lg:block"> {/* hidden lg:block  <-> lg:hidden */}
          {titleSection}
        </div>
        
        <article className="post prose mx-auto">
          <Markdown
            children={post.content}
            remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype, remarkMath]}
            rehypePlugins={[rehypeSlug, rehypeKatex]}
            components={{
              p: React.Fragment, // https://github.com/remarkjs/react-markdown/issues/42
              img: CustomImage,
              ...AdmonitionComponents,
              pre: Pre,
            }}
          />
        </article>
      </div>
      
    </div>
  );
};
export default PostPage;


export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
};


