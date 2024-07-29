import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Header() {
  return (
    <nav className="flex items-center justify-between bg-cyan-500">
      
      <Link href="/">
        <h1 className="cursor-pointer p-2 text-3xl font-bold sm:ml-6 md:ml-10 md:p-6 lg:p-10 lg:text-4xl">Title</h1>
      </Link>
      
      <ul className={`mr-4 flex sm:mr-10 sm:text-xl lg:mr-16`}>
        <Link href="/">
          <li className="cursor-pointer p-2 hover:underline sm:p-6 lg:p-10">
            <p className='text-center'>Home</p>
          </li>
        </Link>
        <Link href="/blog">
          <li className="cursor-pointer p-2 hover:underline sm:p-6 lg:p-10">
            <p className='text-center'>Blog</p>
          </li>
        </Link>
        <Link href="/material">
          <li className="cursor-pointer p-2 hover:underline sm:p-6 lg:p-10">
            <p className='text-center'>Materials</p>
          </li>
        </Link>
        <li className="cursor-pointer p-2 hover:underline sm:p-6 lg:p-10">
          <a href="https://github.com/kkensuke/nextjs-blog-tutorial" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <FaGithub className='text-2xl lg:text-3xl' />
          </a>
        </li>
      </ul>
      
    </nav>
  );
}
