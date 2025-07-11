import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import posts from "../blog/_index";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <p className="section max-w-prose mx-auto">Post not found.</p>;
  }

  // --- reading-time helper ---
  const words = post.body.split(/\s+/).length;
  const readMins = Math.max(1, Math.round(words / 200));

  return (
    <>
      <Helmet>
        <title>{post.title} | Jackson Ledbetter Blog</title>
        <meta name="description" content={post.excerpt ?? post.title} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <article className="section max-w-prose mx-auto py-12">
        <img src={post.image} alt="" className="rounded-lg mb-6" />

        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="mb-10 text-sm text-neutral-600">
          {post.date} • {readMins} min read
        </p>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="prose prose-neutral dark:prose-invert prose-img:rounded-lg"
        >
          {post.body}
        </ReactMarkdown>
      </article>
    </>
  );
}
