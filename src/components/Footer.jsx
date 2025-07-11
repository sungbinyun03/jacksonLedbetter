export default function Footer() {
    return (
      <footer className="section text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Jackson Ledbetter · Boston, MA ·{" "}
        <a href="mailto:jackson@jacksonledbetter.com" className="underline">
          Email
        </a>
      </footer>
    );
  }
  