import React from 'react';
import { BookOpen, Calendar, ExternalLink, Camera, Award } from 'lucide-react';

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

const photos = [
  { id: 1, title: "Conference Presentation", category: "Academic" },
  { id: 2, title: "Research Team", category: "Team" },
  { id: 3, title: "Lab Work", category: "Research" },
  { id: 4, title: "Workshop", category: "Events" }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-screen-md px-4">
      {/* Publications Section */}
      <section className="mt-16">
        <div className="mb-12 flex items-center gap-3">
          <BookOpen className="text-slate-600" size={32} />
          <h1 className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-4xl font-bold text-transparent">
            Publications
          </h1>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <div className="space-y-8">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md"
            >
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
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                      >
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

      {/* Photos Section */}
      <section className="mb-16 mt-24">
        <div className="mb-12 flex items-center gap-3">
          <Camera className="text-slate-600" size={32} />
          <h1 className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-4xl font-bold text-transparent">
            Photos
          </h1>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
            >
              <img
                src={`/api/placeholder/800/600`}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-xl font-semibold text-white">
                  {photo.title}
                </h3>
                <p className="text-sm text-slate-200">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}