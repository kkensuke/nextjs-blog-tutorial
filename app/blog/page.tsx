import getPostMetadata from "../../components/getPostMetadata";
import PostPreview from "../../components/PostPreview";
import getAllTags from "../../components/getAllTags";


const allTags = getAllTags();
const tagSection = (
  <>
    <ul className="mt-2 flex flex-wrap justify-center gap-1">
      {allTags.map((tag: string) => (
        <li key={tag} className="mr-2">
          <a href={`/blog/tags/${tag}`} className="rounded-md border-2 px-2 text-slate-700 hover:underline">{tag}</a>
        </li>
      ))}
    </ul>
  </>
);


const posts = getPostMetadata();
const postPreviews = posts.map((post) => (
  <PostPreview key={post.slug} {...post} />
));


const BlogPage = () => {
  return (
    <div className="mx-auto max-w-screen-md">
      <div className="my-8 text-center text-4xl text-slate-600">
        Blog
      </div>
      <div className="my-4 mx-4 text-center text-slate-600 sm:mx-16 sm:my-10">
        {allTags.length > 0 && tagSection}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {postPreviews}
      </div>
    </div>
  );
};

export default BlogPage;
