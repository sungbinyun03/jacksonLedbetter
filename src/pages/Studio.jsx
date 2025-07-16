import gear from "../data/gear";
import drums1 from "../assets/drums1.jpg";
import drums2 from "../assets/drums2.jpg";
import drums3 from "../assets/drums3.JPG";
import drums4 from "../assets/drums4.JPG";
import logoBg from "../assets/34logo2.PNG";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import drums5 from "../assets/drums4.jpg";
 

export default function Studio() {
  const gallery = [drums1, drums2, drums3, drums4];

  const services = [
    "Drumset Performance",
    "Drum Recordings", 
    "Music Production",
    "Recording Engineering",
    "Mix & Master Engineering",
    "Drum Lessons",
    "Music Production Lessons"
  ];

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

      {/* gallery header */}
      <section className="section grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {gallery.map((src, i) => (
          <img key={src + i} src={src} alt="" className="rounded-lg shadow-md" />
        ))}
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
