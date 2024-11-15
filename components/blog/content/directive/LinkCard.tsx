// components/blog/content/directive/client.tsx
'use client';

import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import Image from 'next/image';


interface LinkCardProps {
  url: string;
}

interface Metadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

const getImageSize = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = url;
  });
};

export const LinkCard: React.FC<LinkCardProps> = ({ url }) => {
  const [metadata, setMetadata] = React.useState<Metadata | null>(null);
  const [imageSize, setImageSize] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  React.useEffect(() => {
    try {
      const urlObj = new URL(url);
      fetch(`/api/metadata?url=${urlObj.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          setMetadata(data as Metadata);
          if (data.image) {
            getImageSize(data.image).then(setImageSize);
          }
        })
        .catch(console.error);
    } catch (e) {
      console.error(e);
    }
  }, [url]);

  let urlObj: URL;
  try {
    urlObj = new URL(url);
  } catch (e) {
    console.error(e);
    return <>{url}</>;
  }

  if (!metadata) {
    return <>{url}</>;
  }

  const { title, description, image } = metadata;

  return (
    <Card className="my-4 overflow-hidden">
      <a
        href={url}
        className="flex gap-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        {image && imageSize && (
          <div className="relative h-40 w-40 flex-shrink-0">
            <Image
              src={image}
              alt={title || ""}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col justify-between p-4">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Image
              src={`https://www.google.com/s2/favicons?domain=${urlObj.hostname}`}
              alt=""
              width={16}
              height={16}
              className="rounded-sm"
            />
            <span>{urlObj.hostname}</span>
          </div>
        </div>
      </a>
    </Card>
  );
};