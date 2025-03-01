import React from 'react';
import Link from 'next/link';
import { AiOutlineHome } from "react-icons/ai";
import { Pencil } from 'lucide-react';
import { BsCart3 } from "react-icons/bs";
import { BookOpen } from 'lucide-react';
import { IoCameraOutline } from "react-icons/io5";
import { SiGithub } from 'react-icons/si';
import { ROUTES } from '@/config/constants';
import { SITE_CONFIG } from '@/config/site';


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
    { label: <AiOutlineHome size={26}/>,  title: 'Home', href: ROUTES.HOME },
    { label: <Pencil size={24}/>,  title: 'Blog', href: ROUTES.BLOG },
    { label: <BsCart3 size={26}/>,  title: 'Products', href: ROUTES.PRODUCTS },
    { label: <BookOpen size={26}/>,  title: 'Publications', href: ROUTES.PUBLICATIONS },
    { label: <IoCameraOutline size={29}/>,  title: 'Photos', href: ROUTES.PHOTOS },
    { label: <SiGithub size={24}/>,  title: 'GitHub', href: SITE_CONFIG.social.github },
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
              key={typeof item.label === 'string' ? item.label : item.href}
              title={item.title}
              href={item.href}
              className="rounded-md px-2 py-2 text-sm font-medium font-light text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-3 sm:text-xl"
            >
              {item.label}
            </Link>
          ))}

        </div>
      </nav>
    </header>
  );
};

export default Header;