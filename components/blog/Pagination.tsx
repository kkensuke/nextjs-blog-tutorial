import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogLanguage } from '@/lib/blog/localization';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  language?: BlogLanguage;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/blog',
  language = 'ja',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getHref = (page: number) => {
    const params = new URLSearchParams();

    if (language === 'en') params.set('lang', 'en');
    if (page > 1) params.set('page', String(page));

    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 4
  );

  const inactiveClass = 'border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-[#171717] hover:text-slate-300';

  return (
    <nav className="mt-12 flex items-center justify-center gap-1">
      {currentPage > 1 ? (
        <Link
          href={getHref(currentPage - 1)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${inactiveClass}`}
        >
          <ChevronLeft size={16} />
        </Link>
      ) : (
        <span className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg border border-slate-800 text-slate-600">
          <ChevronLeft size={16} />
        </span>
      )}

      {pages.map((page, idx) => {
        const prev = pages[idx - 1];
        return (
          <span key={page} className="flex items-center gap-1">
            {prev && page - prev > 1 && (
              <span className="px-1 text-slate-500">…</span>
            )}
            <Link
              href={getHref(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'border-blue-500 bg-blue-600 text-white'
                  : inactiveClass}`}
            >
              {page}
            </Link>
          </span>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={getHref(currentPage + 1)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${inactiveClass}`}
        >
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg border border-slate-800 text-slate-600">
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
