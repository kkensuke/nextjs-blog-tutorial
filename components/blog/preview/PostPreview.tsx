import React from 'react';
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { PostMetadata } from "@/lib/blog/PostMetadata";

const PostPreview = (props: PostMetadata) => {
  const moreThan100 = props.subtitle.length > 100;
  const subtitle = props.subtitle.slice(0, 100) + (moreThan100 ? "..." : "");

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white will-change-transform hover:bg-slate-50">
      <Link 
        href={`/blog/posts/${props.slug}`} 
        className="block overflow-hidden rounded-xl transition-colors"
      >
        <div className="p-6">
          {/* Date */}
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <Calendar size={14} />
            <span>{props.date}</span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-xl font-semibold text-slate-800 transition-colors hover:text-sky-600">
            {props.title}
          </h2>
          
          {/* Preview image */}
          {props.previewImage && (
            <img 
              src={props.previewImage} 
              alt={props.title} 
              className="mb-4 h-28 w-full rounded-lg object-cover object-center" 
            />
          )}

          {/* Subtitle */}
          <p className="mb-4 text-slate-600">
            {subtitle}
          </p>

          {/* Read more indicator */}
          <div className="flex items-center gap-2 text-sm font-medium text-sky-600">
            Read more 
            <ArrowRight size={16} />
          </div>
        </div>
      </Link>

      {/* Tags section */}
      <div className="rounded-b-xl border-t border-slate-100 px-6 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <Tag size={14} className="text-slate-400" />
          {props.tags && props.tags.length > 0 ? (
            props.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/blog/tags/${tag}`}
                className="rounded-full bg-white px-2 text-sm text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100 hover:text-slate-900"
              >
                {tag}
              </Link>
            ))
          ) : (
            <span className="text-sm text-slate-400">No tags</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPreview;