"use client";

import { useEffect, useRef } from "react";

const Comment = () => {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    const scriptElem = document.createElement("script");
    scriptElem.src = "https://utteranc.es/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";
    scriptElem.setAttribute("repo", "kkensuke/nextjs-blog-tutorial.github.io");
    scriptElem.setAttribute("issue-term", "pathname");
    scriptElem.setAttribute("label", "blog-comment");
    scriptElem.setAttribute("theme", "github-dark");

    commentsRef.current.appendChild(scriptElem);
  }, []);

  return <section ref={commentsRef} />;
};

export default Comment;
