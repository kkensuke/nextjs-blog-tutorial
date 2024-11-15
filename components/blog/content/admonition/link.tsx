"use client";

import React, { useEffect, useState, useMemo } from "react";

interface LinkCardProps {
  children: React.ReactNode;
}

const MICROLINK_API = "https://api.microlink.io/";
const DEFAULT_FAVICON_SIZE = 48;

const LinkCard: React.FC<LinkCardProps> = ({ children }) => {
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    domain: "",
  });

  // Extract URL from children
  const extractUrl = (node: React.ReactNode): string => {
    if (React.isValidElement(node)) {
      if (Array.isArray(node.props.children)) {
        return node.props.children.join("") || "";
      }
      return node.props.children?.toString() || "";
    }
    return node?.toString() || "";
  };

  const url = useMemo(() => extractUrl(children).trim(), [children]);

  // Fetch metadata when URL is valid
  useEffect(() => {
    const fetchMetadata = async () => {
      if (!url || !url.match(/^https?:\/\/.+/)) return;

      try {
        const response = await fetch(`${MICROLINK_API}?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.status === "success") {
          setMetaData({
            title: data.data.title || "",
            description: data.data.description || "",
            imageUrl: data.data.image?.url || "",
            domain: getDomain(url),
          });
        }
      } catch (error) {
        console.error("Metadata fetch error:", error);
      }
    };

    fetchMetadata();
  }, [url]);

  // Extract domain from URL
  const getDomain = (url: string): string => {
    try {
      const { hostname } = new URL(url);
      return hostname;
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
      className="my-4 block rounded-2xl border border-slate-300 bg-white px-4 no-underline hover:border-slate-400 hover:bg-slate-50"
    >
      <div className="flex items-center gap-4">
        {/* URL Details */}
        <div className="flex-1 overflow-hidden">
          <p className="text-md truncate font-semibold text-slate-900">
            {metaData.title || metaData.domain}
          </p>
          <p className="truncate text-sm text-slate-600">
            {metaData.description || ""}
          </p>
        </div>

        {/* Image Section (right-aligned and 20% width) */}
        <div className="w-1/5 flex-shrink-0">
          {metaData.imageUrl ? (
            <img
              src={metaData.imageUrl}
              alt="Preview"
              className="mx-auto h-20 rounded-lg border-slate-300 object-cover"
            />
          ) : (
            <img
              src={`https://www.google.com/s2/favicons?domain=${metaData.domain}&sz=${DEFAULT_FAVICON_SIZE}`}
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
