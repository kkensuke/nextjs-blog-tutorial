import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  const moreThan75: boolean = props.subtitle.length > 75;
  const subtitle: string = props.subtitle.slice(0, 75) + (moreThan75 ? "..." : "");
  return (
    <Link href={`/blog/posts/${props.slug}`}>
    <div className="h-36 rounded-md border border-slate-300 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-400">{props.date}</p>
        <h2 className="mb-4 text-sky-600">{props.title}</h2>
      <p className="text-slate-700">{subtitle}</p>
    </div>
    </Link>
  );
};

export default PostPreview;
