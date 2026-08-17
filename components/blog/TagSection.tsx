import React from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import type { BlogLanguage } from '@/lib/blog/localization';

type TagSectionProps = {
  tags: string[];
  activeTag?: string;
  language?: BlogLanguage;
};

const TagSection = ({ tags, activeTag, language = 'ja' }: TagSectionProps) => {
  if (!tags || tags.length === 0) return null;

  const decodedActiveTag = activeTag ? decodeURIComponent(activeTag).toLowerCase() : undefined;
  const languageQuery = language === 'en' ? '?lang=en' : '';

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map((tag: string) => {
        const isActive = decodedActiveTag ? tag.toLowerCase() === decodedActiveTag : false;

        return (
          <Link
            key={tag}
            href={isActive ? `/blog${languageQuery}` : `/blog/tags/${tag}${languageQuery}`}
            className={`group flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-cyan-950 text-cyan-300 hover:bg-cyan-900'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Bookmark size={14} className="opacity-60 group-hover:opacity-100" />
            {tag}
          </Link>
        );
      })}
    </div>
  );
};

export default TagSection;
