import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo34 from "../assets/34logo1.png";

const navLinks = [
  { path: "/about", label: "About" },
  // { path: "/blog", label: "Blog" }
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

  // Helper to close menu on link click
  const handleClose = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 relative bg-white/70 backdrop-blur-md border-b border-black/10 px-4 py-6 md:px-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-1">
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

        {/* Desktop menu */}
        <ul
          className={
            "gap-6 font-medium leading-none items-center hidden md:flex"
          }
        >
          <StudioNavItem closeMenu={handleClose} />
          <li><a href="https://credits.muso.ai/profile/5162283a-055d-43d7-b063-5fd7b3b76e64" className="hover:underline">Credits</a></li>
          <li>
            <NavLink to="/studio#services" className="hover:underline" onClick={handleClose}>
              Services
            </NavLink>
          </li>
          {navLinks.map(l => (
            <li key={l.path} className="py-0.5">
              <NavLink
                to={l.path}
                onClick={handleClose}
                className={({ isActive }) =>
                  isActive ? "underline" : "hover:underline"
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li><a href="https://www.instagram.com/jackson.ledbetter?igsh=eXJpaDY3eGcwdGpt&utm_source=qr" className="hover:underline">Instagram</a></li>
          <li><a href="https://open.spotify.com/artist/5JemdPtKVI3tRODIOvSZbp?si=mqLloH-EQS2gPIATt3QxKw" className="hover:underline">Spotify</a></li>
          <li><a href="mailto:jackson@jacksonledbetter.com" className="hover:underline">Email</a></li>
        </ul>

        {/* Mobile menu dropdown */}
        {open && (
          <>
            {/* Click-away backdrop */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={handleClose}
              className="fixed inset-0 z-40 md:hidden cursor-default"
              style={{ background: "transparent" }}
            />

            {/* Dropdown panel */}
            <div className="absolute left-0 right-0 top-full z-50 md:hidden bg-white/70 backdrop-blur-md border-b border-black/10 shadow-lg">
              <ul className="flex flex-col gap-6 w-full text-lg font-medium px-6 py-6">
                <StudioNavItem closeMenu={handleClose} />
                <li><a href="https://credits.muso.ai/profile/5162283a-055d-43d7-b063-5fd7b3b76e64" className="hover:underline" onClick={handleClose}>Credits</a></li>
                <li>
                  <NavLink to="/studio#services" className="hover:underline" onClick={handleClose}>
                    Services
                  </NavLink>
                </li>
                {navLinks.map(l => (
                  <li key={l.path} className="py-0.5">
                    <NavLink
                      to={l.path}
                      onClick={handleClose}
                      className={({ isActive }) =>
                        isActive ? "underline" : "hover:underline"
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
                <li><a href="https://www.instagram.com/jackson.ledbetter?igsh=eXJpaDY3eGcwdGpt&utm_source=qr" className="hover:underline" onClick={handleClose}>Instagram</a></li>
                <li><a href="https://open.spotify.com/artist/5JemdPtKVI3tRODIOvSZbp?si=mqLloH-EQS2gPIATt3QxKw" className="hover:underline" onClick={handleClose}>Spotify</a></li>
                <li><a href="mailto:jackson@jacksonledbetter.com" className="hover:underline" onClick={handleClose}>Email</a></li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
