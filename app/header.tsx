import React from 'react';
import Link from 'next/link';
import { Github, Code2, Terminal, Rocket, Sparkles } from 'lucide-react';

// Different title styles you can choose from
const TitleStyles = {
  // 1. Gradient Text with Icon
  GradientWithIcon: () => (
    <div className="flex items-center gap-2">
      <Code2 className="text-blue-500" size={24} />
      <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-xl font-bold text-transparent">
        kkensuke
      </span>
    </div>
  ),

  // 2. Minimal Monospace
  MinimalMonospace: () => (
    <div className="font-mono text-lg font-semibold tracking-tight">
      <span className="text-slate-900">&lt;</span>
      <span className="text-blue-600">kensuke</span>
      <span className="text-slate-900">/&gt;</span>
    </div>
  ),

  // 3. Terminal Style
  TerminalStyle: () => (
    <div className="flex items-center gap-2 font-mono">
      <Terminal size={20} className="text-green-500" />
      <span className="text-lg font-medium">
        ~/<span className="text-green-500">ken</span>
      </span>
    </div>
  ),

  // 4. Modern Split
  ModernSplit: () => (
    <div className="flex items-center font-bold">
      <span className="text-xl text-slate-900">Ken</span>
      <span className="text-xl text-blue-500">Lab</span>
      <Sparkles className="ml-1 text-yellow-400" size={18} />
    </div>
  ),

  // 5. Playful Style
  PlayfulStyle: () => (
    <div className="relative">
      <span className="text-xl font-black uppercase tracking-wider text-slate-800">
        KENSUKE
      </span>
      <div className="absolute -right-9 -top-2">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
          dev
        </span>
      </div>
    </div>
  ),

  // 6. Tech Brand
  TechBrand: () => (
    <div className="flex items-center gap-2">
      <Rocket className="text-purple-500" size={24} />
      <span className="text-xl font-bold tracking-tight">
        ken<span className="text-purple-500">dev</span>
      </span>
    </div>
  ),
};

const Header = () => {
  // Choose your preferred style here
  const SelectedTitle = TitleStyles.GradientWithIcon;

  const navItems = [
    // { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Photos', href: '/photos' },
    { label: 'Publications', href: '/publications' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo - Replace the simple title with your chosen style */}
        <Link href="/" className="hover:opacity-80">
          <SelectedTitle />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Main nav items */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
            <Github size={20} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;