"use client";

import React, { useEffect } from 'react';
import tocbot from 'tocbot'

const TOC = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.post',
      headingSelector: 'h2, h3',
    });
    return () => tocbot.destroy()
  }, []);


  return (
    // sticky toc; lg:fixed lg:top-52 lg:right-7
    <div className="my-10 mx-auto rounded-lg border-2">
      <h2 className="mb-1 border-b p-2 text-center text-xl font-semibold">
        Table of Contents
      </h2>
      <div className='toc my-1 flex justify-center'></div>
      <style jsx global>{`
        .toc {
          border-radius: 0.25rem;
          padding: 1rem;
          font-size: 13pt;
        }

        .toc-list {
          padding-left: 11pt;
          padding-top: 0.5rem;
        }

        .toc-list-item {
          padding-bottom: 0.5rem;
        }

        .toc-list-item:last-child {
          padding-bottom: 0;
        }

        .toc-link {
          color: #4a5568;
        }

        .is-active-link {
          color: #2b6cb0;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default TOC;