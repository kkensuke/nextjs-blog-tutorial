import getPostMetadata from "./getPostMetadata";

const getAllTags = (): string[] => {
  const allPosts = getPostMetadata();
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags || [])));
  return allTags
};

export default getAllTags;
