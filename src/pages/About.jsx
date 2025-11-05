import { useContentConfig } from "../hooks/useContentConfig";

export default function About() {
  const { config, resolveAsset, isLoading } = useContentConfig();

  if (isLoading || !config) {
    return <section className="section"><div>Loading...</div></section>;
  }

  const aboutConfig = config.about || {};
  const paragraphs = aboutConfig.paragraphs || [];
  const images = aboutConfig.images ? aboutConfig.images.map(img => resolveAsset(img)) : [];

  return (
    <section className="section max-w-7xl mx-auto px-4 sm:px-8 py-10">
  <h2 className="text-2xl font-bold mb-8 text-center">About</h2>

  <div className="grid md:grid-cols-2 gap-6 items-start" style={{ textAlign: aboutConfig.textAlign || 'left' }}>
    {/* Left: Text content */}
    <div className="space-y-6 text-lg leading-7">
      {paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
    </div>

    {/* Right: Staggered image layout */}
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt="Jackson"
          className="rounded-xl shadow-lg object-cover w-full h-auto transition hover:scale-105 duration-300"
        />
      ))}
    </div>
  </div>
</section>

  );
}
