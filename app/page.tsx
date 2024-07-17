import Link from 'next/link';

// This is the main page of my website written in React with TypeScript and Tailwind CSS.
export default function HomePage() {
  return (
    <div className='container mx-auto px-4'>      
      <section className="rounded-lg bg-gray-100 py-20 text-center shadow-md">
        <h1 className="text-6xl font-bold">Hi, I'm Ken! 👋</h1>
        <p className="mt-8 text-lg">🧑‍💻 Welcome to my personal website. 🚀</p>
        <p className="mt-2 text-lg">🌟 Built with React, TypeScript, and Tailwind CSS. 🌈</p>
      </section>

      <section className="mt-24">
        <h2 className="text-4xl font-semibold">About Me</h2>
        <p className="m-8 text-xl text-gray-700">I am a passionate web developer with experience in building modern web applications. I love working with the latest technologies and constantly learning new things.</p>
      </section>

      <section className="mt-24">
        <h2 className="text-4xl font-semibold">Projects</h2>
        <ul className="m-8 text-xl">
          <li className="py-6">
            <Link href="/projects/project1">
              <p className="text-blue-500 hover:underline">Project 1</p>
            </Link>
            <p  className="ml-8 mt-4"> - A web application built with React and Tailwind CSS</p>
          </li>
          <li className="py-6">
            <Link href="/projects/project2">
              <p className="text-blue-500 hover:underline">Project 2</p>
            </Link>
            <p  className="ml-8 mt-4"> - A full-stack application using Next.js and Prisma</p>
          </li>
        </ul>
      </section>

      <section className="mt-24">
        <h2 className="text-4xl font-semibold">Blog</h2>
        <Link href="/blog">
          <p className="ml-8 mt-10 inline-block text-xl text-blue-500 hover:underline">Go to the blog</p>
        </Link>
      </section>

      <section className="my-28">
        <h2 className="text-4xl font-semibold">CV</h2>
        <p className="ml-8 mt-10 text-gray-700">
          <a href="./directory/yourfile.pdf" className="text-xl text-blue-500 hover:underline" download>Download CV</a>
        </p>
      </section>
    </div>
  );
};
