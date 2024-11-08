import React from 'react';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';

const GradientWithIcon = () => (
  <div className="flex items-center gap-2">
    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-xl font-bold text-transparent">
      kkensuke
    </span>
  </div>
);

const Header = () => {
  // Choose your preferred style here
  const SelectedTitle = GradientWithIcon;

  const navItems = [
    { label: 'Blog', href: '/blog' },
    { label: 'Products', href: '/products' },
    { label: 'Publications', href: '/publications' },
    { label: 'Photos', href: '/photos' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo - Replace the simple title with your chosen style */}
        <Link href="/" className="hover:opacity-80">
          <SelectedTitle />
        </Link>

        {/* Navigation */}
        <div className="flex items-center md:gap-4">
          {/* Main nav items */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-2 py-2 text-sm font-medium font-light text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3 sm:text-xl"
            >
              {item.label}
            </Link>
          ))}

          {/* GitHub link */}
          <a
            href="https://github.com/kkensuke/nextjs-blog-tutorial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <SiGithub size={20} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;