import fs from "fs";
import matter from "gray-matter";
import getPostMetadata from "../../../../components/getPostMetadata";

// import MarkdownIt from "markdown-it";
// import docutilsPlugin from "markdown-it-docutils";
import TOC from "../../../../components/toc";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
// import CodeBlock from "../../../../components/CodeBlock";
import Pre from "../../../../components/pre";
import AdmonitionComponents from "../../../../components/admonitions";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
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
  // const text = MarkdownIt().use(docutilsPlugin).render(post.content)
  
  return (
    <div>
      <div>
        <div className="my-12 text-center">
          <h1 className="text-2xl text-slate-600">{post.data.title}</h1>
          <p className="mt-2 text-slate-600">{post.data.subtitle}</p>
          <p className="mt-2 text-slate-600">{post.data.date}</p>
        </div>
        
        <TOC/>

        <article className="post prose mx-auto max-w-screen-md">
          {/* <div dangerouslySetInnerHTML={{ __html: text }}></div> */}
          <Markdown
            children={post.content}
            remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              ...AdmonitionComponents,
              // code : CodeBlock, // This function regards the code block with no language specified as inline code
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