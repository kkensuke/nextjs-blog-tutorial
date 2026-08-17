import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogLanguage } from '@/lib/blog/localization';
import type { PostLinks } from '@/lib/blog/getPostLinks';

type PostNavigationProps = PostLinks & {
  language: BlogLanguage;
};

export default function PostNavigation({
  previous,
  next,
  related,
  language,
}: PostNavigationProps) {
  const isJapanese = language === 'ja';

  if (!previous && !next && related.length === 0) return null;

  return (
    <div className="mx-auto mb-16 max-w-screen-sm px-4 sm:px-0">
      {(previous || next) && (
        <nav aria-label="Post navigation" className="grid gap-4 sm:grid-cols-2">
          {previous && (
            <Link
              href={`/blog/posts/${previous.slug}`}
              className="rounded-lg border border-slate-700 p-4 text-left transition-colors hover:border-slate-600 hover:bg-[#171717]"
            >
              <span className="flex items-center gap-1 text-sm text-slate-500">
                <ChevronLeft size={16} />
                {isJapanese ? '前の記事' : 'Previous post'}
              </span>
              <span className="mt-2 block font-medium text-slate-300">
                {previous.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/blog/posts/${next.slug}`}
              className={`rounded-lg border border-slate-700 p-4 text-right transition-colors hover:border-slate-600 hover:bg-[#171717] ${
                previous ? '' : 'sm:col-start-2'
              }`}
            >
              <span className="flex items-center justify-end gap-1 text-sm text-slate-500">
                {isJapanese ? '次の記事' : 'Next post'}
                <ChevronRight size={16} />
              </span>
              <span className="mt-2 block font-medium text-slate-300">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section className="mt-10 border-t border-slate-700 pt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-300">
            {isJapanese ? '関連記事' : 'Related posts'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/posts/${post.slug}`}
                className="flex justify-between gap-2 rounded-lg border border-slate-700 p-4 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-[#171717] hover:text-sky-300"
              >
                {post.title}
                <ArrowRight className="mt-0.5 shrink-0" size={15} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
