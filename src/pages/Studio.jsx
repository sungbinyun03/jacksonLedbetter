import gear from "../data/gear";
import logoBg from "../assets/34logo2.PNG";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useContentConfig } from "../hooks/useContentConfig";

export default function Studio() {
  const { config, resolveAsset, isLoading } = useContentConfig();
  
  // Get gallery images from config
  const gallery = config?.studio?.galleryImages 
    ? config.studio.galleryImages.map(img => resolveAsset(img))
    : [];

  // Get gear from config, fall back to gear.js if not available
  const studioGear = config?.gear || gear;

  // Carousel state
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 3500; // ms

  // Auto-scroll logic
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % gallery.length);
    }, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [current, gallery.length]);

  // Manual navigation
  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((c) => (c - 1 + gallery.length) % gallery.length);
  const next = () => setCurrent((c) => (c + 1) % gallery.length);

  // Scroll to #services if hash is present
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#services") {
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const services = config?.studio?.services || [];
  
  if (isLoading || !config) {
    return <div className="section"><div>Loading...</div></div>;
  }

  return (
    <div className="relative">
      <img
        src={logoBg}
        alt=""
        aria-hidden
        className="pointer-events-none fixed inset-0 m-auto w-96 opacity-15 grayscale-0     
                       select-none hidden lg:block"
        style={{ zIndex: -1 }}
      />

      {/* Carousel */}
      <section className="section flex flex-col items-center">
        <div className="relative w-full max-w-2xl aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
          {gallery.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Studio gallery"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ pointerEvents: i === current ? 'auto' : 'none' }}
            />
          ))}
          {/* Arrows */}
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md text-xl z-20" aria-label="Previous">
            ‹
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md text-xl z-20" aria-label="Next">
            ›
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {gallery.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full ${i === current ? 'bg-neutral-800' : 'bg-neutral-300'} transition`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* services section */}
      <section id="services" className="section" style={{ textAlign: config.studio?.textAlign || 'left' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Services</h2>
          <div className="flex justify-center">
            <ul className="list-disc pl-5 space-y-2 text-lg text-left w-full max-w-2xl">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* gear list */}
      <section className="section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Studio 34 Gear</h2>
          <div className="grid gap-x-10 gap-y-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(studioGear).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="text-xl font-semibold mb-2">{cat}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
