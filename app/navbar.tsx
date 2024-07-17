import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mb-3 rounded-md border-2 border-slate-400 py-3">
      <ul className="flex flex-wrap justify-center text-xl text-black">
        <Link href="/about">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            About
          </li>
        </Link>
        <Link href="/blog">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            Blog
          </li>
        </Link>
        <Link href="/photo">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            Photos
          </li>
        </Link>
        <Link href="/cv">
          <li className="mx-2 w-28 py-1 text-center hover:bg-slate-300">
            CV
          </li>
        </Link>
      </ul>
    </nav>
  );
}
