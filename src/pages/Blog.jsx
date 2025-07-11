import { Link } from "react-router-dom";
import posts from "../blog/_index";          // ← built by gray-matter in _index.js

export default function Blog() {
  return (
    <section className="section max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center">Blog</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="group block hover:-translate-y-1 transition-transform"
          >
            <img
              src={p.image}
              alt=""
              loading="lazy"
              className="w-full h-48 object-cover rounded-lg shadow-md group-hover:opacity-90 transition"
            />
            <h3 className="mt-4 text-xl font-semibold group-hover:underline">
              {p.title}
            </h3>
            <p className="mt-1 text-sm text-neutral-600">{p.date}</p>
            {p.excerpt && (
              <p className="mt-2 text-neutral-700 line-clamp-2">{p.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
