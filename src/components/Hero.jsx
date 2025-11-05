import { useContentConfig } from "../hooks/useContentConfig";

export default function Hero() {
  const { config, resolveAsset, isLoading } = useContentConfig();

  if (isLoading || !config) {
    return <section className="section flex flex-col items-center text-center"><div>Loading...</div></section>;
  }

  const homeConfig = config.home || {};

  return (
    <section className="section flex flex-col items-center" style={{ textAlign: homeConfig.textAlign || 'center' }}>
      {homeConfig.heroImage && (
        <img
          src={resolveAsset(homeConfig.heroImage)}
          alt="Jackson Ledbetter"
          className="w-110 h-80 object-cover rounded-xl ring-4 ring-gray-200 shadow-md mb-6"
        />
      )}

      {/* name */}
      {homeConfig.title && (
        <h1 className="text-2xl font-extrabold tracking-wide mb-4">
          {homeConfig.title}
        </h1>
      )}

      {/* tagline */}
      {homeConfig.subtitle && (
        <p className="max-w-xl leading-relaxed">
          {homeConfig.subtitle}
        </p>
      )}
    </section>
  );
}
