import Link from 'next/link';

// This is the main page of my website written in React with TypeScript and Tailwind CSS.
const HomePage = () => {
  return (
    <div className='mt-10'>
      <h1 className="p-5 text-center text-4xl font-bold">Hi, I'm Ken! 👋</h1>
      <p className="mt-4 text-center">🧑‍💻 This is the main page of my website. 🚀</p>
      <p className="mt-4 text-center">🌟 Built with React, TypeScript, and Tailwind CSS. 🌈</p>
      
      <div className="mt-8 text-center">
        <Link href="/blog">
          <p className="text-xl text-blue-500 hover:underline">Go to the blog</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
