import Link from 'next/link';
import type { BlogLanguage } from '@/lib/blog/localization';

type LanguageToggleProps = {
  language: BlogLanguage;
  basePath?: string;
};

const languages: { value: BlogLanguage; label: string }[] = [
  { value: 'ja', label: '日本語' },
  { value: 'en', label: 'English' },
];

export default function LanguageToggle({
  language,
  basePath = '/blog',
}: LanguageToggleProps) {
  return (
    <nav aria-label="Blog language" className="flex justify-end">
      <div className="inline-flex rounded-lg border border-slate-700 bg-[#0f0f0f] p-1">
        {languages.map(({ value, label }) => (
          <Link
            key={value}
            aria-current={language === value ? 'page' : undefined}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              language === value
                ? 'bg-slate-700 text-slate-100'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
            }`}
            href={value === 'en' ? `${basePath}?lang=en` : basePath}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
