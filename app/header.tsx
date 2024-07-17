'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between bg-cyan-500">
      
      <Link href="/">
        <h1 className="cursor-pointer py-2 pl-4 text-3xl font-bold sm:ml-6 md:ml-10 md:p-6 lg:p-10 lg:text-4xl">Title</h1>
      </Link>
      
      <div className="block pr-4 sm:hidden">
        <button className="px-3 py-2 text-white focus:outline-none" onClick={toggleMenu}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      
      <ul className={`sm:flex ${isOpen ? 'block' : 'hidden'} w-full sm:w-auto  text-xl lg:mr-16 sm:mr-10`}>
        <Link href="/">
          <li className="cursor-pointer p-4 hover:underline sm:p-6 lg:p-10" onClick={toggleMenu}>
            <p className='text-center'>Home</p>
          </li>
        </Link>
        <Link href="/blog">
          <li className="cursor-pointer p-4 hover:underline sm:p-6 lg:p-10" onClick={toggleMenu}>
            <p className='text-center'>Blog</p>
          </li>
        </Link>
        <Link href="/photo">
          <li className="cursor-pointer p-4 hover:underline sm:p-6 lg:p-10" onClick={toggleMenu}>
            <p className='text-center'>Photos</p>
          </li>
        </Link>
        <Link href="mailto:email@example.com">
          <li className="cursor-pointer p-4 hover:underline sm:p-6 lg:p-10" onClick={toggleMenu}>
            <p className='text-center'>Contact</p>
          </li>
        </Link>
      </ul>
      
    </nav>
  );
}
