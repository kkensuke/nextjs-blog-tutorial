import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  const moreThan75: boolean = props.subtitle.length > 75;
  const subtitle: string = props.subtitle.slice(0, 75) + (moreThan75 ? "..." : "");
  return (
    <div>
      <Link href={`/blog/posts/${props.slug}`}>
      <div className="h-32 rounded-t-md border border-slate-300 bg-white p-4 shadow-sm">
        <div className="flex justify-between">
          <h2 className="mb-4 text-sky-600">{props.title}</h2>
          <p className="text-right text-sm text-slate-400">{props.date}</p>
        </div>
        <p className="text-slate-700">{subtitle}</p>
      </div>
      </Link>
      {props.tags ? (
        <ul className="flex flex-wrap gap-1 rounded-b-md border p-2">
          {props.tags.map((tag: string) => (
            <li key={tag} className="mr-2">
              <a href={`/blog/tags/${tag}`} className="rounded-md border-2 px-2 text-slate-700 hover:underline">{tag}</a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-b-md border p-2 text-slate-700"> no tags </div>
      )}
    </div>
  );
};

export default PostPreview;
