import React from 'react';
import Link from 'next/link';
import { Mail, FileText, ArrowRight, Github, ExternalLink } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto mt-16 max-w-screen-md px-4">      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-16 text-center text-white shadow-xl md:px-12 md:py-24">
        <div className="relative z-10">
          <h1 className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Hi, I'm Ken! 👋
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Welcome to my corner of the web where I share my journey in development.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="https://github.com/kkensuke/nextjs-blog-tutorial" target="_blank" className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <Github size={18} />
              GitHub
            </a>
            <Link href="/blog" className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600">
              <ArrowRight size={18} />
              Read Blog
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </section>

      {/* About Section */}
      <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 md:p-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">About Me</h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        {/* Main Content */}
        <div className="mt-6">
          {/* Bio Column */}
          <div className="md:col-span-2 md:pr-6">
            <p className="text-lg leading-relaxed text-slate-600">
              I am a passionate web developer with experience in building modern web applications. 
              I love working with the latest technologies and constantly learning new things.
            </p>
            
            {/* Skills Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'Python',
                'C++',
                'TypeScript',
                'React',
                'Next.js',
                'Tailwind CSS',
                'PostgreSQL',
              ].map((tech) => (
                <span 
                  key={tech}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a href="/cv.pdf" download className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600 transition-all hover:bg-slate-100">
              <FileText size={18} />
              <span>Download CV</span>
            </a>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600">
              <Mail size={18} />
              <span className="text-sm">example.12345 [at] gmail.com</span>
            </div>

            <a href="https://github.com/kkensuke/nextjs-blog-tutorial" target="_blank" className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600 transition-all hover:bg-slate-100">
              <Github size={18} />
              <span>GitHub Profile</span>
            </a>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 font-medium text-slate-600">
              <span>📍 Tokyo, Japan</span>
            </div>
          </div>
          
        </div>
      </section>

      {/* Projects Section */}
      <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 md:p-10">
        <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">Featured Projects</h2>
        <div className="mt-8 space-y-8">
          <div className="group rounded-xl border border-slate-200 p-6 transition-all hover:bg-slate-50">
            <Link href="/projects/project1" className="block">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Project 1</h3>
                  <p className="mt-2 text-slate-600">A web application built with React and Tailwind CSS</p>
                </div>
                <ExternalLink size={20} className="text-slate-400 transition-colors group-hover:text-slate-900" />
              </div>
            </Link>
          </div>

          <div className="group rounded-xl border border-slate-200 p-6 transition-all hover:bg-slate-50">
            <Link href="/projects/project2" className="block">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Project 2</h3>
                  <p className="mt-2 text-slate-600">A full-stack application using Next.js and Prisma</p>
                </div>
                <ExternalLink size={20} className="text-slate-400 transition-colors group-hover:text-slate-900" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Publications Link */}
      <Link href="/publications">
        <section className="mt-16 rounded-xl border border-slate-200 p-6 transition-all hover:bg-slate-50">        
          <h2 className='text-xl font-bold'>View Publications</h2>
        </section>
      </Link>
      
      {/* Photos Section */}
      <Link href="/photos">
        <section className="my-16 rounded-xl border border-slate-200 p-6 transition-all hover:bg-slate-50">        
          <h2 className='text-xl font-bold'>View Photos</h2>
        </section>
      </Link>
      
    </div>
  );
};