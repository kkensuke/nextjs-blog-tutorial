import Link from 'next/link';

// This is the main page of my website written in React with TypeScript and Tailwind CSS.
export default function HomePage() {
  return (
    <div className='container mx-auto px-4'>      
      <section className="rounded-lg bg-gray-100 p-10 text-center shadow-md">
        <h1 className="text-6xl font-bold">Hi, I'm Ken! 👋</h1>
        {/* <p className="mt-8 text-lg">🧑‍💻 Welcome to my personal website. 🚀</p>
        <p className="mt-2 text-lg">🌟 Built with React, TypeScript, and Tailwind CSS. 🌈</p> */}
      </section>

      <section className="mt-24 rounded-lg bg-gray-100 p-10">
        <h2 className="text-4xl font-semibold">About Me</h2>
        <p className="ml-8 mt-8 text-xl text-gray-700">I am a passionate web developer with experience in building modern web applications. I love working with the latest technologies and constantly learning new things.</p>
        
        <div className='ml-8 mt-8 flex justify-between'>
          <p className="text-xl text-blue-500 hover:underline">
            <a href="./directory/yourfile.pdf" download>Download CV</a>
          </p>
          
          <p className="text-xl text-gray-700"> example.12345 [at] gmail.com </p>
        </div>
      </section>

      <section className="mt-24 rounded-lg bg-gray-100 p-10">
        <h2 className="text-4xl font-semibold">Projects</h2>
        <ul className="ml-8 text-xl">
          <li className="mt-12">
            <Link href="/projects/project1">
              <p className="text-blue-500 hover:underline">Project 1</p>
            </Link>
            <p  className="ml-8 mt-4"> - A web application built with React and Tailwind CSS</p>
          </li>
          <li className="mt-12">
            <Link href="/projects/project2">
              <p className="text-blue-500 hover:underline">Project 2</p>
            </Link>
            <p  className="ml-8 mt-4"> - A full-stack application using Next.js and Prisma</p>
          </li>
        </ul>
      </section>

      <section className="mt-24 mb-28 rounded-lg bg-gray-100 p-10">
        <h2 className="text-4xl font-semibold">Blog</h2>
        <Link href="/blog">
          <p className="ml-8 mt-10 inline-block text-xl text-blue-500 hover:underline">Go to the blog</p>
        </Link>
      </section>
    </div>
  );
};
