import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

const files = import.meta.glob("./*.md", { eager: true, as: "raw" });

const posts = Object.entries(files).map(([path, raw]) => {
  // const { data, content } = matter(raw);
  const slug = path.split("/").pop().replace(/\.md$/, "");
  const data = {
    title: "5 Drum-Tuning Tricks for a Gig-Ready Kit",
    date: "2025-06-24",
    image: "/assets/blog-covers/drum-tuning.jpg",
    excerpt: "Quick tweaks that shave minutes off sound-check and make FOH engineers smile.",
  };
  const content = `
  `;
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
