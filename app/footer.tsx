import React from 'react';
import Link from 'next/link';
import { AiOutlineHome } from "react-icons/ai";
import { Pencil } from 'lucide-react';
import { BsCart3 } from "react-icons/bs";
import { BookOpen } from 'lucide-react';
import { IoCameraOutline } from "react-icons/io5";
import { SiGithub, SiTwitter, SiLinkedin, SiGmail } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    explore: [
      { label: 'Home', icon: AiOutlineHome, href: '/' },
      { label: 'Blog', icon: Pencil, href: '/blog' },
      { label: 'Products', icon: BsCart3, href: '/products' },
      { label: 'Publications', icon: BookOpen, href: '/publications' },
      { label: 'Photos', icon: IoCameraOutline, href: '/photos' }
    ],
    social: [
      { label: 'X', icon: SiTwitter, href: 'https://x.com' },
      { label: 'GitHub', icon: SiGithub, href: 'https://github.com/kkensuke/nextjs-blog-tutorial' },
      { label: 'LinkedIn', icon: SiLinkedin, href: 'https://linkedin.com' },
      { label: 'Email', icon: SiGmail, href: 'mailto:email@example.com' }
    ],
    tech: [
      { label: 'Next.js', href: 'https://nextjs.org' },
      { label: 'Tailwind CSS', href: 'https://tailwindcss.com' },
      { label: 'Vercel', href: 'https://vercel.com' }
    ]
  };

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8">
        <div className="grid justify-evenly gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo Section */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <img 
                src="/images/simple_logo.png" 
                alt="Logo" 
                className="h-12 w-12 rounded-xl"
              />
            </Link>
            <p className="text-sm text-slate-500">
              Building the future with code and creativity.
            </p>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-800">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="group flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
                    >
                      <Icon size={16} />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-800">
              Connect
            </h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
                    >
                      <Icon size={16} />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tech Stack Section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-800">
              Powered by
            </h3>
            <ul className="space-y-2">
              {footerLinks.tech.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                    <ExternalLink size={14}/>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-600 sm:flex-row">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/policy" className="transition-colors hover:text-slate-900">
              Privacy Policy & Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;