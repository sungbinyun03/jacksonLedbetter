import about1 from "../assets/ledbetter2.jpg";
import about2 from "../assets/ledbetter3.jpg";

const paragraphs = [
  "Jackson Ledbetter, a Northern Virginia native, is a producer, recording and post‑production engineer, studio musician, and educator.",
  "He began playing drums in third grade and has since performed over 400 shows across the nation. He has played drums for artists like Vivienne Artur, Shane Brady, Ellie Irwin, Dipsea Flower, and Matilde Heckler at venues such as Brighton Music Hall, Mercury Lounge, and Rockwood Music Hall.",
  "In 2023 he performed at Faster Horses Country Music Festival supporting Vivienne Artur. Jackson has tracked drums and percussion for a wide variety of artists spanning many genres, with examples including Nicolas McCoppin, Dipsea Flower, and Ruby Plume.",
  "He is fluent in Pro Tools and Ableton Live 12 and recently launched his full‑service studio business, Studio 34.",
  "Jackson graduated with a Bachelor of Music from Berklee College of Music in May 2025."
];

export default function About() {
  return (
    <section className="section max-w-7xl mx-auto px-4 sm:px-8 py-10">
  <h2 className="text-2xl font-bold mb-8 text-center">About</h2>

  <div className="grid md:grid-cols-2 gap-6 items-start">
    {/* Left: Text content */}
    <div className="space-y-6 text-lg leading-7">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>

    {/* Right: Staggered image layout */}
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      <img
        src={about1}
        alt="Jackson in studio"
        className="rounded-xl shadow-lg object-cover w-full h-auto transition hover:scale-105 duration-300"
      />
      <img
        src={about2}
        alt="Jackson performing"
        className="rounded-xl shadow-lg object-cover w-full h-auto transition hover:scale-105 duration-300"
      />
    </div>
  </div>
</section>

  );
}
