

export default function Footer() {
  return (
    <footer className="mt-10 bg-cyan-400 py-8 px-4 font-mono text-black">
      <div className="container mx-auto flex items-start justify-between">
        <div className="flex items-center">
          <img src="/images/simple_logo.png" alt="Logo" className="h-24 w-24" />
        </div>
        <div className="grid grid-cols-3 gap-32">
          <div>
            <h5 className="mb-2 font-bold">Explore</h5>
            <div className="mb-2 h-0.5 w-full bg-black"></div>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/blog" className="hover:underline">Blog</a></li>
              <li><a href="/photos" className="hover:underline">Photos</a></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-2 font-bold">Connect</h5>
            <div className="mb-2 h-0.5 w-full bg-black"></div>
            <ul>
              <li><a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:underline">X</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a></li>
              <li><a href="/cv" target="_blank" rel="noopener noreferrer" className="hover:underline">Resume</a></li>
              <li><a href="mailto:email@example.com" className="hover:underline">Email</a></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-2 font-bold">Powered by</h5>
            <div className="mb-2 h-0.5 w-full bg-black"></div>
            <ul>
              <li><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="hover:underline">React</a></li>
              <li><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:underline">Next.js</a></li>
              <li><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Tailwind CSS</a></li>
              <li><a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Vercel</a></li>
              <li><a href="https://www.prisma.io" target="_blank" rel="noopener noreferrer" className="hover:underline">Prisma</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs">
        © 2024 Kensuke
      </div>
    </footer>
  );
}
