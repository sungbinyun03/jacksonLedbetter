import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

import matter from "gray-matter";

const files = import.meta.glob("./*.md", { eager: true, as: "raw" });

const posts = Object.entries(files).map(([path, raw]) => {
  const { data, content } = matter(raw);
  const slug = path.split("/").pop().replace(/\.md$/, "");

  return {
    slug,
    ...data,
    date: new Date(data.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    body: content,
  };
});

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

export default posts;   // ← this is what Blog.jsx imports
