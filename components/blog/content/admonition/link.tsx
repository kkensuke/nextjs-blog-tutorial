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
      className="my-4 block rounded-2xl border border-slate-200 bg-white px-6 no-underline hover:border-slate-400 hover:bg-slate-50"
    >
      <div className="flex items-center gap-4">
        {/* URL Details */}
        <div className="flex-1 overflow-hidden">
          <p className="text-md truncate font-semibold text-slate-900">
            {metaData.title || metaData.domain}
          </p>
          <p className="truncate text-sm text-slate-600">
            {metaData.description || ''}
          </p>
        </div>

        {/* Image Section (right-aligned and 20% width) */}
        <div className="w-1/5 flex-shrink-0">
          {metaData.imageUrl ? (
            <img
              src={metaData.imageUrl}
              alt="Preview"
              className="h-20 rounded-lg border border-slate-300 object-cover"
            />
          ) : (
            <img
              src={`https://www.google.com/s2/favicons?domain=${metaData.domain}&sz=48`}
              alt="favicon"
              className="h-10 w-10 rounded-lg border border-slate-300"
            />
          )}
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
