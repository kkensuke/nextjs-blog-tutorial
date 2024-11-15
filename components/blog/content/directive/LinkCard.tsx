'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface LinkCardProps {
  url: string;
}

interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

const LinkCard: React.FC<LinkCardProps> = ({ url }) => {
  const [metadata, setMetadata] = React.useState<Metadata | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const urlObj = new URL(url);
        const response = await fetch(`/api/metadata?url=${encodeURIComponent(urlObj.toString())}`);
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching metadata:', err);
      }
    };

    fetchMetadata();
  }, [url]);

  if (error) {
    return (
      <Card className="my-4 p-4">
        <p className="text-red-500">Failed to load preview for: {url}</p>
      </Card>
    );
  }

  if (!metadata) {
    return (
      <Card className="my-4 p-4">
        <p className="text-gray-500">Loading preview...</p>
      </Card>
    );
  }

  const { title, description, image } = metadata;

  return (
    <Card className="my-4 overflow-hidden hover:bg-slate-50">
      <a
        href={url}
        className="flex gap-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        {image && (
          <div className="relative h-32 w-32 flex-shrink-0">
            <img
              src={image}
              alt={title || ""}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col justify-between p-4">
          <div>
            <h3 className="text-lg font-semibold">
              {title || url}
            </h3>
            {description && (
              <p className="mt-2 text-sm text-slate-600">
                {description}
              </p>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <img
              src={`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`}
              alt=""
              className="h-4 w-4"
            />
            <span>{new URL(url).hostname}</span>
          </div>
        </div>
      </a>
    </Card>
  );
};

export default LinkCard;