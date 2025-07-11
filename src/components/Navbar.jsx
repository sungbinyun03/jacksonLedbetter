import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo34 from "../assets/34logo1.png";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/blog", label: "Blog" }
];


function StudioNavItem({ closeMenu }) {
  const [burst, setBurst] = useState(false);

  const trigger = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 600); // reset
    closeMenu();
  };

  return (
    <li className="relative">
      <NavLink
        to="/studio"
        onClick={trigger}
        className={({ isActive }) =>
          `${isActive ? "underline" : "hover:underline"} relative inline-block`
        }
      >
        {/* burst logo */}
        {burst && (
          <img
            src={logo34}
            alt=""
            aria-hidden
            className="absolute inset-0 m-auto w-14 opacity-30 pointer-events-none animate-pop-once"
          />
        )}
        <span className="relative z-10">Studio 34</span>
      </NavLink>
    </li>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur px-4 py-6 md:px-6">
  <nav className="max-w-7xl mx-auto flex items-center justify-between py-1"> {/* 👈 kill .section, set py-1 */}
    <NavLink to="/" className="font-extrabold text-lg leading-none tracking-wide">
      JACKSON LEDBETTER
    </NavLink>

    <button
      aria-label="Toggle menu"
      className="md:hidden text-xl leading-none p-1"
      onClick={() => setOpen(o => !o)}
    >
      ☰
    </button>

    <ul
      className={`md:flex gap-6 font-medium leading-none items-center ${
        open ? "block" : "hidden md:block"
      }`}
    >
      {navLinks.map(l => (
        <li key={l.path} className="py-0.5">   
          <NavLink
            to={l.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            {l.label}
          </NavLink>
        </li>
      ))}
      <StudioNavItem closeMenu={() => setOpen(false)} />

      <li><a href = " https://credits.muso.ai/profile/5162283a-055d-43d7-b063-5fd7b3b76e64" className = "hover:underline"> Credits </a></li>
      <li><a href="https://open.spotify.com/artist/5JemdPtKVI3tRODIOvSZbp?si=mqLloH-EQS2gPIATt3QxKw" className="hover:underline">Spotify</a></li>
      <li><a href="https://www.instagram.com/jackson.ledbetter?igsh=eXJpaDY3eGcwdGpt&utm_source=qr" className="hover:underline">Instagram</a></li>
    </ul>
  </nav>
</header>

  );
}
