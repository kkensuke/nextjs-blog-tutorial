import getPostMetadata from "../../components/getPostMetadata";
import PostPreview from "../../components/PostPreview";
import { PostMetadata } from "../../components/PostMetadata";

const BlogPage = () => {
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
  
  const AllTags = Array.from(new Set(postMetadata.flatMap(post => post.tags || [])));
  const tag_section = (
    <>
      {/* <h1 className="text-xl">Tags</h1> */}
      <ul className="mt-2 flex flex-wrap justify-center gap-1">
        {AllTags.map((tag: string) => (
          <li key={tag} className="mr-2">
            <a href={`/blog/tags/${tag}`} className="rounded-md border-2 px-2 text-slate-700 hover:underline">{tag}</a>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <div className="mx-auto max-w-screen-md">
      <div className="my-8 text-center text-4xl text-slate-600">
        Blog
      </div>
      <div className="my-4 mx-4 text-center text-slate-600 sm:mx-16 sm:my-10">
        {AllTags.length > 0 && tag_section}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{postPreviews}</div>
    </div>
  );
};

export default BlogPage;
