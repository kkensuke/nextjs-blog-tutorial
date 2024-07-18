import Link from 'next/link';

// This is the main page of my website written in React with TypeScript and Tailwind CSS.
export default function HomePage() {
  return (
    <div className='container mx-auto mt-16'>      
      <section className="rounded-lg bg-gray-100 p-4 text-center shadow-md md:p-10">
        <h1 className="text-4xl font-bold md:text-6xl">Hi, I'm Ken! 👋</h1>
        <p className="mt-8 text-lg">🧑‍💻 Welcome to my personal website. 🚀</p>
        <p className="mt-2 text-lg">🌟 Built with React and Tailwind CSS. 🌈</p>
      </section>

      <section className="mt-24 rounded-lg bg-gray-100 p-4 md:p-10">
        <h2 className="text-2xl font-semibold md:text-4xl">About Me</h2>
        <p className="ml-4 mt-8 text-gray-700 md:ml-8 md:text-xl">I am a passionate web developer with experience in building modern web applications. I love working with the latest technologies and constantly learning new things.</p>
        
        <div className='ml-4 mt-8 flex flex-col justify-between sm:flex-row md:ml-8'>
          <p className="text-blue-500 hover:underline md:text-xl"><a href="./directory/yourfile.pdf" download>Download CV</a></p>
          <p className="text-gray-700 md:text-xl"> example.12345 [at] gmail.com </p>
        </div>
      </section>

      <section className="mt-24 rounded-lg bg-gray-100 p-4 md:p-10">
        <h2 className="text-2xl font-semibold md:text-4xl">Projects</h2>
        <ul className="ml-4 md:ml-8 md:text-xl">
          <li className="mt-8">
            <Link href="/projects/project1">
              <p className="text-blue-500 hover:underline">Project 1</p>
            </Link>
            <p  className="ml-4 mt-4 md:ml-8"> - A web application built with React and Tailwind CSS</p>
          </li>
          <li className="mt-8">
            <Link href="/projects/project2">
              <p className="text-blue-500 hover:underline">Project 2</p>
            </Link>
            <p  className="ml-4 mt-4 md:ml-8"> - A full-stack application using Next.js and Prisma</p>
          </li>
        </ul>
      </section>

      <section className="mt-24 mb-28 rounded-lg bg-gray-100 p-4 md:p-10">
        <h2 className="text-2xl font-semibold md:text-4xl">Blog</h2>
        <Link href="/blog">
          <p className="ml-4 mt-8 inline-block text-blue-500 hover:underline md:ml-8 md:text-xl">Go to the blog</p>
        </Link>
      </section>
    </div>
  );
};
