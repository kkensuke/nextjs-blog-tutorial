import React from 'react';
import { BookOpen, Calendar, ExternalLink, Award } from 'lucide-react';

const publications = [
  {
    title: "Title 1",
    description: "Description 1",
    date: "2024",
    link: "https://example.com/paper1",
    tags: ["Machine Learning", "AI"],
    award: "Best Paper Award"
  },
  {
    title: "Title 2",
    description: "Description 2",
    date: "2023",
    link: "https://example.com/paper2",
    tags: ["Data Science"]
  },
  {
    title: "Title 3",
    description: "Description 3",
    date: "2023",
    link: "https://example.com/paper3",
    tags: ["Web Development", "React"]
  }
];


export default function PublicationsPage() {
  return (
    <div className="mx-auto max-w-screen-md">
      {/* Publications Section */}
      <section className="mt-12">
        <div className="mb-12 flex items-center gap-3">
          <BookOpen className="text-slate-600" size={32} />
          <h1 className="bg-clip-text text-4xl font-bold text-slate-700">
            Publications
          </h1>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <div className="space-y-8">
          {publications.map((pub, index) => (
            <div key={index} className="group relative rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={14} />
                    <span>{pub.date}</span>
                    {pub.award && (
                      <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                        <Award size={12} />
                        {pub.award}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-semibold text-slate-800">
                    {pub.title}
                  </h2>

                  <p className="text-lg text-slate-600">{pub.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}