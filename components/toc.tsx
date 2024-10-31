"use client";

import React, { useEffect } from 'react';
import tocbot from 'tocbot';
import { ListOrdered } from 'lucide-react';

const TOC = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.post',
      headingSelector: 'h2, h3',
      hasInnerContainers: true,
      linkClass: 'toc-link',
      activeLinkClass: 'is-active-link',
      listClass: 'toc-list',
      listItemClass: 'toc-list-item',
      collapseDepth: 6,
      scrollSmooth: true,
      scrollSmoothDuration: 420,
    });

    return () => tocbot.destroy();
  }, []);

  return (
    <div>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-slate-200 p-4">
          <ListOrdered className="text-slate-400" size={20} />
          <h2 className="font-semibold text-slate-700">
            Table of Contents
          </h2>
        </div>

        {/* TOC Content */}
        <div className="toc p-4" />
      </div>

      {/* Styles */}
      <style jsx global>{`
        /* Base list styles */
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.95rem;
        }

        /* Nested list indentation */
        .toc-list .toc-list {
          padding-left: 1rem;
          margin-top: 0.5rem;
        }

        /* List items */
        .toc-list-item {
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        /* Links */
        .toc-link {
          color: #64748b;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
          position: relative;
          padding-left: 0.25rem;
        }

        /* Link hover effect */
        .toc-link:hover {
          color: #0f172a;
        }

        /* Active link styles */
        .is-active-link {
          color: #2563eb;
          font-weight: 500;
        }

        /* Active link indicator */
        .is-active-link::before {
          content: '';
          position: absolute;
          left: -0.25rem;
          top: 0.2rem;
          bottom: 0.2rem;
          width: 2px;
          background: #2563eb;
          border-radius: 1px;
        }

        /* Nested active links */
        .is-active-link + .toc-list .toc-link {
          color: #475569;
        }

        /* Smooth height transitions for collapsible sections */
        .toc-list {
          transition: height 0.3s ease;
        }

        /* Enhance visibility of current section */
        .is-active-li > .toc-link {
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
};

export default TOC;