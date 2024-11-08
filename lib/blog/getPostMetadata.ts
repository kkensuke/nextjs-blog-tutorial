import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "./PostMetadata";

const getPostMetadata = (): PostMetadata[] => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      tags: matterResult.data.tags,
      slug: fileName.replace(".md", ""),
    };
  });
  
  // Sort post metadata by date in descending order
  posts.sort((a, b) => {
    // First, compare dates
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    // If dates are the same, compare titles
    if (dateComparison === 0) {
      return a.title.localeCompare(b.title);
    }
    return dateComparison;
  });
  
  return posts;
};

export default getPostMetadata;
