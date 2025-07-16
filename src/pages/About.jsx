import about1 from "../assets/ledbetter2.jpg";
import about2 from "../assets/ledbetter3.jpg";

const paragraphs = [
  "Jackson Ledbetter, a Northern Virginia native, is a producer, recording and post‑production engineer, studio musician, and educator.",
  "He began playing drums in third grade and has since performed over 400 shows across the nation. He has played drums for artists like Vivienne Artur, Shane Brady, Ellie Irwin, Dipsea Flower, and Matilde Heckler performing at venues such as Brighton Music Hall, Mercury Lounge, and Rockwood Music Hall.",
  "In 2023 he performed at Faster Horses Country Music Festival supporting Vivienne Artur. Jackson has tracked drums and percussion for a wide variety of artists spanning many genres, some examples including Nicolas McCoppin, Dipsea Flower, Ruby Plume.",
  "Music production is what set him on a career within the music industry, and what inspired him to pursue a degree at Berklee. He started his production career with Logic and is now focused in Pro Tools and Ableton Live 12. His production work has featured on songs by Vivienne Artur, Kohanna, and his own music including recent projects like Vivienne's sophomore EP \"Take It All Home\" and a collaborative piece with close friends Nathan Mayne and Aidan Bass titled \"APT 34.\"",
  "Jackson initially began mixing and mastering only on songs he produced, but has since expanded into post‑production engineering for other artists. He has mixed for Vivienne Artur, Dipsea Flower, Keefer, Anyon Elder, and Mac n Toss. Notable mastering work includes \"Needing Me\" by Vivienne Artur, \"Sundance\" by Dipsea Flower, and \"Painting Fences\" by Anyon Elder.",
  "He has had over 20 students in either drumset, concert percussion, or music production lessons since he started teaching in 2018.",
  "Jackson graduated with a Bachelor of Music from Berklee College of Music in May 2025, at the same time he also launched his full‑service music studio/business, Studio 34."
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
