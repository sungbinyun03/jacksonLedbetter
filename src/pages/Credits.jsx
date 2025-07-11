export default function Credits() {
    return (
      <section className="section">
        <h2 className="text-3xl font-bold mb-8">Selected Credits</h2>
        <p className="mb-4">
          Full discography available on{" "}
          <a
            href="https://credits.muso.ai/profile/5162283a-055d-43d7-b063-5fd7b3b76e64"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Muso.ai
          </a>
          .
        </p>
  
        {/* Muso embed (light theme) */}
        <iframe
          title="Muso Credits"
          src="https://embed-credits.muso.ai/5162283a-055d-43d7-b063-5fd7b3b76e64?theme=light"
          className="w-full h-[600px] border rounded-lg"
        />
      </section>
    );
  }
  