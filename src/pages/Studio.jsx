import gear from "../data/gear";
import drums1 from "../assets/drums1.jpg";
import drums2 from "../assets/drums2.jpg";
import drums3 from "../assets/drums3.JPG";
import drums4 from "../assets/drums4.JPG";
import logoBg from "../assets/34logo2.PNG";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Studio() {
  const gallery = [drums1, drums2, drums3, drums4];

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

  const services = [
    "Drumset Performance",
    "Drum Recordings", 
    "Music Production",
    "Recording Engineering",
    "Mix & Master Engineering",
    "Drum Lessons",
    "Music Production Lessons"
  ];

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
      <section id="services" className="section">
        <h2 className="text-3xl font-bold mb-8">Services</h2>
        <ul className="list-disc pl-5 space-y-2 text-lg">
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>

      {/* gear list */}
      <section className="section">
        <h2 className="text-3xl font-bold mb-8">Studio 34 Gear</h2>

        {Object.entries(gear).map(([cat, items]) => (
          <div key={cat} className="mb-10">
            <h3 className="text-xl font-semibold mb-2">{cat}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
