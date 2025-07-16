import heroImg from "../assets/ledbetter1.jpg";

export default function Hero() {
  return (
    <section className="section flex flex-col items-center text-center">
      <img
        src={heroImg}
        alt="Jackson Ledbetter"
        className="w-110 h-80 object-cover rounded-xl ring-4 ring-gray-200 shadow-md mb-6"
      />

      {/* name */}
      <h1 className="text-2xl font-extrabold tracking-wide mb-4">
        JACKSON LEDBETTER
      </h1>

      {/* tagline */}
      <p className="max-w-xl leading-relaxed">
        is a <strong>drummer, producer, educator, recording, mixing & mastering engineer</strong> based in <strong>Northern Virginia</strong>.
      </p>
    </section>
  );
}
