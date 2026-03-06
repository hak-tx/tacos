// Dynamic spot pages with per-spot OG meta tags

// Static spot data for OG tags (must match TacoTourApp.jsx)
const SPOTS = {
  1: { name: "Torchy's Tacos", city: "Austin, TX", richRating: 9.2, fanRating: 8.7, richQuote: "The brisket taco changed my life. I'm writing a song about it." },
  2: { name: "Velvet Taco", city: "Dallas, TX", richRating: 8.4, fanRating: 9.1, richQuote: "Creative as hell. The spicy tikka taco is no joke." },
  3: { name: "Güero's Taco Bar", city: "Austin, TX", richRating: 7.8, fanRating: 8.9, richQuote: "Solid. Good vibes. The salsa verde carries it." },
  4: { name: "Valentina's Tex Mex BBQ", city: "Austin, TX", richRating: 9.7, fanRating: 9.4, richQuote: "Best brisket taco in Texas. Maybe the world. Come at me." },
  5: { name: "Taqueria El Ultimo Rey", city: "Houston, TX", richRating: 9.0, fanRating: 8.3, richQuote: "My hometown spot. Been coming here since high school. Real ones know." },
  6: { name: "El Primo Taco Truck", city: "San Angelo, TX", richRating: 8.8, fanRating: 7.9, richQuote: "Found this gem after a show at the Arc Light. Absolute sleeper." },
  7: { name: "Rosario's", city: "San Antonio, TX", richRating: 8.1, fanRating: 8.7, richQuote: "San Antonio always delivers. The puffy taco is legit." },
  8: { name: "Chela's Tacos", city: "El Paso, TX", richRating: 9.4, fanRating: 9.0, richQuote: "El Paso does not get enough credit. This spot is borderline perfect." },
  9: { name: "Taco Cabana", city: "Lubbock, TX", richRating: 6.5, fanRating: 7.4, richQuote: "Look, it's 2am after a show. This hits different at that hour. Don't judge me." },
  10: { name: "Rusty Taco", city: "Fort Worth, TX", richRating: 8.0, fanRating: 8.2, richQuote: "Fort Worth's taco game is underrated. The fried avocado taco slaps." },
  11: { name: "Tacos El Regio", city: "Corpus Christi, TX", richRating: 9.1, fanRating: 8.8, richQuote: "Fish tacos on the coast hit different. The shrimp al pastor is unreal." },
  12: { name: "Taqueria Datapoint", city: "San Antonio, TX", richRating: 8.9, fanRating: 9.2, richQuote: "The al pastor here might be the best in SA. That's saying something." },
  13: { name: "Villa's Tacos", city: "Amarillo, TX", richRating: 8.3, fanRating: 7.6, richQuote: "Drove 6 hours for these. Would do it again. Panhandle people know." },
  14: { name: "Tacoholics", city: "Midland, TX", richRating: 8.6, fanRating: 8.1, richQuote: "West Texas surprises you. The brisket birria taco is a top 5 moment." },
  15: { name: "Frezko Taco Spot", city: "Flower Mound, TX", richRating: 8.7, fanRating: 8.9, richQuote: "Build your own taco bar done right. The wagyu beef is elite." },
  16: { name: "Laredo Taco Company", city: "Laredo, TX", richRating: 9.3, fanRating: 9.1, richQuote: "Yes it's inside a gas station. Yes it's one of the best tacos in Texas. Fight me." },
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const spot = SPOTS[id];
  if (!spot) return { title: "Rich O'Toole's Tacos Setlist" };

  const ogUrl = `https://tacos-lime.vercel.app/api/og?name=${encodeURIComponent(spot.name)}&city=${encodeURIComponent(spot.city)}&rich=${spot.richRating}&fans=${spot.fanRating}&quote=${encodeURIComponent(spot.richQuote)}`;

  return {
    title: `${spot.name} — Rich O'Toole's Tacos Setlist`,
    description: `Rich gave ${spot.name} a ${spot.richRating}. "${spot.richQuote}" 🌮🎸`,
    openGraph: {
      title: `${spot.name} — Rich rates it ${spot.richRating}`,
      description: `"${spot.richQuote}" — @RichOToole 🌮🎸🔥`,
      type: "website",
      url: `https://tacos-lime.vercel.app/spot/${id}`,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `${spot.name} review by Rich O'Toole` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${spot.name} — Rich rates it ${spot.richRating} 🌮`,
      description: `"${spot.richQuote}"`,
      images: [ogUrl],
    },
  };
}

export default async function SpotPage({ params }) {
  const { id } = await params;
  const spot = SPOTS[id];
  const name = spot ? spot.name : "Taco Spot";
  const city = spot ? spot.city : "Texas";
  const rating = spot ? spot.richRating : "?";
  const quote = spot ? spot.richQuote : "";

  // Render a simple page that auto-redirects via client-side JS
  // This ensures OG crawlers see the meta tags (they don't run JS)
  // while real users get redirected to the main app
  return (
    <div style={{ minHeight: "100vh", background: "#0d0d14", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", padding: 32, textAlign: "center" }}>
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace("/?spot=${id}");` }} />
      <div style={{ fontSize: 48, marginBottom: 16 }}>🌮</div>
      <h1 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 8px" }}>{name}</h1>
      <p style={{ fontSize: 14, color: "#888", margin: "0 0 16px" }}>{city}</p>
      <p style={{ fontSize: 48, fontWeight: 900, color: "#22C55E", margin: "0 0 8px" }}>{rating}</p>
      <p style={{ fontSize: 13, color: "#E8B100", margin: "0 0 24px" }}>Rich O'Toole's Rating</p>
      <p style={{ fontSize: 14, color: "#ccc", fontStyle: "italic", maxWidth: 300 }}>"{quote}"</p>
      <p style={{ fontSize: 12, color: "#555", marginTop: 32 }}>Loading Tacos Setlist...</p>
    </div>
  );
}
