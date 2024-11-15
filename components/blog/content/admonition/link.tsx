"use client";

import React, { useEffect, useState } from 'react';

interface LinkCardProps {
  children: React.ReactNode;
}

const LinkCard = ({ children }: LinkCardProps) => {
  const [metaData, setMetaData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    domain: '',
  });

  const extractUrl = (children: React.ReactNode): string => {
    if (React.isValidElement(children)) {
      return children.props.children?.toString() || '';
    }
    return children?.toString() || '';
  };

  const url = extractUrl(children).trim();

  useEffect(() => {
    if (url && url.match(/^https?:\/\/.+/)) {
      // Fetch metadata from Microlink API
      fetch(`https://api.microlink.io/?url=${url}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setMetaData({
              title: data.data.title || '',
              description: data.data.description || '',
              imageUrl: data.data.image?.url || '',
              domain: getDomain(url),
            });
          }
        })
        .catch((error) => console.error('Metadata fetch error:', error));
    }
  }, [url]);

  const getDomain = (url: string) => {
    try {
      let domain = url.replace(/^https?:\/\//, '');
      domain = domain.split('/')[0];
      return domain.split(':')[0];
    } catch {
      return url;
    }
  };

  if (!url || !url.match(/^https?:\/\/.+/)) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 shadow-sm">
        Invalid URL format. Please provide a valid HTTP/HTTPS URL.
      </div>
    );
  }

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-4 block rounded-2xl border border-slate-200 px-6 no-underline hover:border-slate-400 hover:bg-slate-50"
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail or Favicon */}
        {metaData.imageUrl ? (
          <img
            src={metaData.imageUrl}
            alt="Preview"
            className="h-12 w-12 rounded-lg border border-slate-300 object-cover"
          />
        ) : (
          <img
            src={`https://www.google.com/s2/favicons?domain=${metaData.domain}&sz=48`}
            alt="favicon"
            className="h-10 w-10 rounded-lg border border-slate-300"
          />
        )}

        {/* URL Details */}
        <div className="flex-1 overflow-hidden">
          <p className="text-md truncate font-semibold text-slate-900">
            {metaData.title || metaData.domain}
          </p>
          <p className="truncate text-sm text-slate-600">
            {metaData.description || ''}
          </p>
        </div>

        {/* External Link Icon */}
        <svg 
          className="h-6 w-6 text-blue-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
          />
        </svg>
      </div>
    </a>
  );
};

export default LinkCard;
