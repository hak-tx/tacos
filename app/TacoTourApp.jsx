"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import html2canvas from "html2canvas";

// ============================================================
// RICH O'TOOLE — TACO TOUR
// Phase 1 Complete Prototype with User Accounts
// Real artist data: richotoole.com | Spotify: 2t6FHAUXxi9eiatP2Mavh0
// Merch: godtexasandtacos.com | Bandsintown: a/39860
// ============================================================

// --- REAL DATA -----------------------------------------------------------

const RICH = {
  name: "Rich O'Toole",
  tagline: "God, Texas & Tacos",
  bio: "Texas Country legend. 75M+ streams. 9 albums. Houston native. Texas A&M Aggie. Mensa member. TexMoji creator. Now reviewing every taco on tour.",
  spotify: "https://open.spotify.com/artist/2t6FHAUXxi9eiatP2Mavh0",
  spotifyId: "2t6FHAUXxi9eiatP2Mavh0",
  instagram: "https://www.instagram.com/richotoole",
  twitter: "https://x.com/RichOToole",
  tiktok: "https://www.tiktok.com/@therichotoole",
  website: "https://richotoole.com",
  merch: "https://godtexasandtacos.com",
  latestAlbum: "God Is a Gentleman",
  label: "PTO Records",
  booking: { agent: "Jimmy Dasher", company: "Countdown Talent" },
};

const ALBUMS = [
  { title: "God Is a Gentleman", year: 2025, current: true, art: "https://i.scdn.co/image/ab67616d00001e02c26ff27f3afc82242f45ad6a", spotifyUrl: "https://open.spotify.com/album/54Q7cSAqRRUzbtxP2WoFm6" },
  { title: "Ghost", year: 2024, art: "https://i.scdn.co/image/ab67616d00001e0233971e9507ea4756d0f08b92", spotifyUrl: "https://open.spotify.com/album/7LgNSIMG2MAX32nnXbHyow" },
  { title: "New York", year: 2020, art: "https://i.scdn.co/image/ab67616d00001e02ae51055fa23016e3b99e4e9e", spotifyUrl: "https://open.spotify.com/album/24xglegMJV5kxktiDQFfds" },
  { title: "American Kid", year: 2017, art: "https://i.scdn.co/image/ab67616d00001e02ddbf3db588c8c192cc0db886", spotifyUrl: "https://open.spotify.com/album/6rGiUaNoDwsLSdx0NpLkh4" },
  { title: "Jaded", year: 2014, art: "https://i.scdn.co/image/ab67616d00001e02092755e728a7cda940e32755", spotifyUrl: "https://open.spotify.com/album/5kTIfBD6aBOr68R6RzPd03" },
  { title: "Brightwork", year: 2013, art: "https://i.scdn.co/image/ab67616d00001e020565eae42ac814ae0d62b748", spotifyUrl: "https://open.spotify.com/album/4c09dk4xQNosTXzzxwTJCx" },
  { title: "Kiss of a Liar", year: 2011, art: "https://i.scdn.co/image/ab67616d00001e024553d2a2f6e41d783d4cd1f6", spotifyUrl: "https://open.spotify.com/album/64LVAaSTfpRZm77EJULBFi" },
  { title: "In a Minute or 2", year: 2008, art: "https://i.scdn.co/image/ab67616d00001e02828fbd0901ad9db89a7b04ce", spotifyUrl: "https://open.spotify.com/album/3ujrqgumKaAgVQek8HmKY2" },
  { title: "Seventeen", year: 2007, art: null, spotifyUrl: "https://open.spotify.com/album/2l68DnC8EtvHv7YyH2Fd37" },
];

const TACO_SPOTS = [
  { id: 1, name: "Torchy's Tacos", city: "Austin, TX", richRating: 9.2, fanRating: 8.7, fanVotes: 1243, lat: 30.267, lng: -97.743, tags: ["Breakfast", "Street Style"], reviewDate: "Mar 1, 2026", tourDate: "Mar 7 — Round Mountain Cider Mill", hasVideo: true, richQuote: "The brisket taco changed my life. I'm writing a song about it.", trending: true, image: "🌮", images: ["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80","https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80","https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=80"] },
  { id: 2, name: "Velvet Taco", city: "Dallas, TX", richRating: 8.4, fanRating: 9.1, fanVotes: 987, lat: 32.776, lng: -96.797, tags: ["Fusion", "Late Night"], reviewDate: "Feb 27, 2026", tourDate: null, hasVideo: false, richQuote: "Creative as hell. The spicy tikka taco is no joke.", trending: true, image: "🌮", images: ["https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=600&q=80","https://images.unsplash.com/photo-1624300629298-e9209b25b5b6?w=400&q=80","https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&q=80"] },
  { id: 3, name: "Güero's Taco Bar", city: "Austin, TX", richRating: 7.8, fanRating: 8.9, fanVotes: 756, lat: 30.252, lng: -97.749, tags: ["Tex-Mex", "Patio Vibes"], reviewDate: "Feb 25, 2026", tourDate: "Mar 7 — Round Mountain Cider Mill", hasVideo: false, richQuote: "Solid. Good vibes. The salsa verde carries it.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=600&q=80","https://images.unsplash.com/photo-1570461226513-bf20a7cbc5fa?w=400&q=80","https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=400&q=80"] },
  { id: 4, name: "Valentina's Tex Mex BBQ", city: "Austin, TX", richRating: 9.7, fanRating: 9.4, fanVotes: 2341, lat: 30.186, lng: -97.789, tags: ["BBQ Fusion", "Legendary"], reviewDate: "Feb 20, 2026", tourDate: "Mar 7 — Round Mountain Cider Mill", hasVideo: true, richQuote: "Best brisket taco in Texas. Maybe the world. Come at me.", trending: true, image: "🌮", images: ["https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=80","https://images.unsplash.com/photo-1562059390-a761a084768e?w=400&q=80","https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"] },
  { id: 5, name: "Taqueria El Ultimo Rey", city: "Houston, TX", richRating: 9.0, fanRating: 8.3, fanVotes: 612, lat: 29.760, lng: -95.369, tags: ["Authentic", "No Frills"], reviewDate: "Feb 15, 2026", tourDate: null, hasVideo: false, richQuote: "My hometown spot. Been coming here since high school. Real ones know.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80","https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80","https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&q=80"] },
  { id: 6, name: "El Primo Taco Truck", city: "San Angelo, TX", richRating: 8.8, fanRating: 7.9, fanVotes: 324, lat: 31.464, lng: -100.437, tags: ["Street", "Cash Only"], reviewDate: "Feb 10, 2026", tourDate: null, hasVideo: true, richQuote: "Found this gem after a show at the Arc Light. Absolute sleeper.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1624300629298-e9209b25b5b6?w=600&q=80","https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400&q=80","https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&q=80"] },
  { id: 7, name: "Rosario's", city: "San Antonio, TX", richRating: 8.1, fanRating: 8.7, fanVotes: 891, lat: 29.424, lng: -98.493, tags: ["Upscale Tex-Mex", "Date Night"], reviewDate: "Feb 5, 2026", tourDate: null, hasVideo: false, richQuote: "San Antonio always delivers. The puffy taco is legit.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1570461226513-bf20a7cbc5fa?w=600&q=80","https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=400&q=80","https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=80"] },
  { id: 8, name: "Chela's Tacos", city: "El Paso, TX", richRating: 9.4, fanRating: 9.0, fanVotes: 1087, lat: 31.761, lng: -106.485, tags: ["Border Style", "Authentic"], reviewDate: "Jan 28, 2026", tourDate: null, hasVideo: true, richQuote: "El Paso does not get enough credit. This spot is borderline perfect.", trending: true, image: "🌮", images: ["https://images.unsplash.com/photo-1562059390-a761a084768e?w=600&q=80","https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80","https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80"] },
  { id: 9, name: "Taco Cabana", city: "Lubbock, TX", richRating: 6.5, fanRating: 7.4, fanVotes: 443, lat: 33.577, lng: -101.845, tags: ["Drive-Thru", "Late Night"], reviewDate: "Jan 22, 2026", tourDate: "Apr 17 — LBK Fest 2026", hasVideo: false, richQuote: "Look, it's 2am after a show. This hits different at that hour. Don't judge me.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&q=80","https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=400&q=80","https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&q=80"] },
  { id: 10, name: "Rusty Taco", city: "Fort Worth, TX", richRating: 8.0, fanRating: 8.2, fanVotes: 567, lat: 32.755, lng: -97.331, tags: ["Craft Tacos", "Brunch"], reviewDate: "Jan 18, 2026", tourDate: null, hasVideo: false, richQuote: "Fort Worth's taco game is underrated. The fried avocado taco slaps.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80","https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400&q=80","https://images.unsplash.com/photo-1570461226513-bf20a7cbc5fa?w=400&q=80"] },
  { id: 11, name: "Tacos El Regio", city: "Corpus Christi, TX", richRating: 9.1, fanRating: 8.8, fanVotes: 398, lat: 27.800, lng: -97.396, tags: ["Coastal", "Seafood Tacos"], reviewDate: "Jan 12, 2026", tourDate: null, hasVideo: true, richQuote: "Fish tacos on the coast hit different. The shrimp al pastor is unreal.", trending: true, image: "🌮", images: ["https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=600&q=80","https://images.unsplash.com/photo-1562059390-a761a084768e?w=400&q=80","https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=80"] },
  { id: 12, name: "Taqueria Datapoint", city: "San Antonio, TX", richRating: 8.9, fanRating: 9.2, fanVotes: 1156, lat: 29.510, lng: -98.570, tags: ["Breakfast", "Al Pastor King"], reviewDate: "Jan 8, 2026", tourDate: null, hasVideo: false, richQuote: "The al pastor here might be the best in SA. That's saying something.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80","https://images.unsplash.com/photo-1624300629298-e9209b25b5b6?w=400&q=80","https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80"] },
  { id: 13, name: "Villa's Tacos", city: "Amarillo, TX", richRating: 8.3, fanRating: 7.6, fanVotes: 201, lat: 35.222, lng: -101.831, tags: ["Panhandle Gem", "Homestyle"], reviewDate: "Jan 3, 2026", tourDate: null, hasVideo: false, richQuote: "Drove 6 hours for these. Would do it again. Panhandle people know.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&q=80","https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80","https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&q=80"] },
  { id: 14, name: "Tacoholics", city: "Midland, TX", richRating: 8.6, fanRating: 8.1, fanVotes: 278, lat: 31.997, lng: -102.077, tags: ["West Texas", "Creative Menu"], reviewDate: "Dec 28, 2025", tourDate: "May 30 — Boyz R Back Festival", hasVideo: true, richQuote: "West Texas surprises you. The brisket birria taco is a top 5 moment.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=600&q=80","https://images.unsplash.com/photo-1570461226513-bf20a7cbc5fa?w=400&q=80","https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=400&q=80"] },
  { id: 15, name: "Frezko Taco Spot", city: "Flower Mound, TX", richRating: 8.7, fanRating: 8.9, fanVotes: 645, lat: 33.014, lng: -97.097, tags: ["Build Your Own", "Fresh"], reviewDate: "Dec 20, 2025", tourDate: "Mar 27 — Lone Star Live", hasVideo: false, richQuote: "Build your own taco bar done right. The wagyu beef is elite.", trending: false, image: "🌮", images: ["https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=80","https://images.unsplash.com/photo-1562059390-a761a084768e?w=400&q=80","https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&q=80"] },
  { id: 16, name: "Laredo Taco Company", city: "Laredo, TX", richRating: 9.3, fanRating: 9.1, fanVotes: 892, lat: 27.506, lng: -99.507, tags: ["Border Town", "Gas Station Legend"], reviewDate: "Dec 15, 2025", tourDate: null, hasVideo: true, richQuote: "Yes it's inside a gas station. Yes it's one of the best tacos in Texas. Fight me.", trending: true, image: "🌮", images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80","https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80","https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=400&q=80"] },
];

// Real upcoming tour dates from Bandsintown
const TOUR_DATES = [
  { date: "Mar 7", day: "Fri", venue: "Round Mountain Cider Mill", city: "Round Mountain, TX", lat: 30.434, lng: -98.383, tacoHunt: "Scouting spots...", soldOut: false, free: true, rsvp: 243 },
  { date: "Mar 14", day: "Fri", venue: "Old Tomball Honky Tonk", city: "Tomball, TX", lat: 30.097, lng: -95.616, tacoHunt: "Scouting spots...", soldOut: false, free: false, rsvp: 187 },
  { date: "Mar 20", day: "Thu", venue: "Junk Gypsy Company", city: "Round Top, TX", lat: 30.060, lng: -96.680, tacoHunt: "Scouting spots...", soldOut: false, free: true, rsvp: 112 },
  { date: "Mar 21", day: "Fri", venue: "Junk Gypsy Company", city: "Round Top, TX", lat: 30.060, lng: -96.680, tacoHunt: "Scouting spots...", soldOut: false, free: true, rsvp: 98 },
  { date: "Mar 27", day: "Thu", venue: "Lone Star Live", city: "Flower Mound, TX", lat: 33.014, lng: -97.097, tacoHunt: "Where should Rich eat? Vote!", soldOut: false, free: false, rsvp: 76 },
  { date: "Apr 2", day: "Wed", venue: "Private Event", city: "Austin, TX", lat: 30.267, lng: -97.743, tacoHunt: "Invite only", soldOut: true, free: true, rsvp: null },
  { date: "Apr 17", day: "Thu", venue: "LBK Fest 2026", city: "Lubbock, TX", lat: 33.577, lng: -101.855, tacoHunt: "Festival taco hunt!", soldOut: false, free: false, rsvp: 340 },
  { date: "Apr 18", day: "Fri", venue: "The Lumberyard", city: "Canyon, TX", lat: 34.980, lng: -101.919, tacoHunt: "Scouting spots...", soldOut: false, free: true, rsvp: 55 },
  { date: "Apr 23", day: "Wed", venue: "The Hall - Gainesville", city: "Gainesville, GA", lat: 34.297, lng: -83.824, tacoHunt: "Georgia taco hunt!", soldOut: false, free: false, rsvp: 63 },
  { date: "Apr 30", day: "Wed", venue: "Chief's on Broadway", city: "Nashville, TN", lat: 36.156, lng: -86.776, tacoHunt: "Nashville taco hunt!", soldOut: false, free: true, rsvp: 201 },
  { date: "May 21", day: "Wed", venue: "Kerrville Folk Festival 2026", city: "Kerrville, TX", lat: 30.047, lng: -99.140, tacoHunt: "Festival taco hunt!", soldOut: false, free: false, rsvp: 158 },
  { date: "May 30", day: "Fri", venue: "Boyz R Back Music Festival 2026", city: "Midland, TX", lat: 31.997, lng: -102.077, tacoHunt: "Festival taco hunt!", soldOut: false, free: false, rsvp: 220 },
];

const PLAYLIST_TRACKS = [
  { title: "God Is a Gentleman", album: "God Is a Gentleman", duration: "3:41", year: 2026 },
  { title: "The Bitter End", album: "Jaded", duration: "4:12", year: 2014 },
  { title: "Krenek Tap Road", album: "Ghost", duration: "3:55", year: 2024 },
  { title: "Marijuana & Jalapenos", album: "Brightwork", duration: "3:28", year: 2013 },
  { title: "Hill Country Rain", album: "Ghost", duration: "4:01", year: 2024 },
  { title: "Roll to G-Town (ft. Bun B & Paul Wall)", album: "Ghost", duration: "3:33", year: 2024 },
  { title: "I'm Never Gonna Quit", album: "American Kid", duration: "3:47", year: 2017 },
  { title: "Casino Queen (ft. Pat Green)", album: "Kiss of a Liar", duration: "4:22", year: 2011 },
];

const DEBATES = [
  { id: 1, question: "Rich gave Valentina's a 9.7 — highest score yet. Deserved?", options: [{ label: "Absolutely 🔥", pct: 62 }, { label: "Too high", pct: 14 }, { label: "Should be a 10!", pct: 24 }], totalVotes: 6421 },
  { id: 2, question: "Best taco city in Texas?", options: [{ label: "Austin", pct: 38 }, { label: "Houston", pct: 22 }, { label: "San Antonio", pct: 29 }, { label: "Dallas", pct: 11 }], totalVotes: 12847 },
  { id: 3, question: "Rich says BBQ tacos are a top tier. Agree?", options: [{ label: "Hell yes 🤠", pct: 71 }, { label: "Keep BBQ separate", pct: 19 }, { label: "Depends on the spot", pct: 10 }], totalVotes: 3892 },
];

const LEADERBOARD = [
  { name: "TacoKing_TX", reviews: 47, city: "Austin", badge: "🏆", streak: 12 },
  { name: "BrisketAndBeans", reviews: 38, city: "Houston", badge: "🥈", streak: 8 },
  { name: "SpicyTakes901", reviews: 31, city: "San Antonio", badge: "🥉", streak: 15 },
  { name: "RichFanATX", reviews: 28, city: "Austin", badge: "🌮", streak: 5 },
  { name: "TacoTuesday4L", reviews: 24, city: "Dallas", badge: "🌮", streak: 3 },
  { name: "TexMexQueen", reviews: 21, city: "Fredericksburg", badge: "🌮", streak: 7 },
];

// Region mapping for reviews
function getRegion(city) {
  if (!city) return "Other";
  const c = city.toLowerCase();
  // Texas metro regions
  if (c.includes("austin") || c.includes("round rock") || c.includes("cedar park") || c.includes("pflugerville")) return "Austin";
  if (c.includes("houston") || c.includes("tomball") || c.includes("katy") || c.includes("sugar land")) return "Houston";
  if (c.includes("dallas") || c.includes("plano") || c.includes("frisco") || c.includes("arlington") || c.includes("irving")) return "Dallas";
  if (c.includes("fort worth") || c.includes("flower mound") || c.includes("denton") || c.includes("southlake")) return "Fort Worth";
  if (c.includes("san antonio") || c.includes("new braunfels") || c.includes("boerne")) return "San Antonio";
  if (c.includes("lubbock") || c.includes("amarillo") || c.includes("canyon")) return "Panhandle";
  if (c.includes("midland") || c.includes("odessa") || c.includes("san angelo")) return "Permian Basin";
  if (c.includes("corpus christi") || c.includes("rockport") || c.includes("port aransas")) return "Coastal TX";
  if (c.includes("el paso")) return "El Paso";
  if (c.includes("laredo") || c.includes("mcallen") || c.includes("brownsville")) return "Border TX";
  if (c.includes("kerrville") || c.includes("fredericksburg") || c.includes("round mountain")) return "Hill Country";
  // Out-of-state: show as state name only
  if (c.includes(", tn") || c.includes("nashville") || c.includes("memphis")) return "Tennessee";
  if (c.includes(", ga") || c.includes("gainesville, ga") || c.includes("atlanta")) return "Georgia";
  if (c.includes(", ok") || c.includes("oklahoma")) return "Oklahoma";
  if (c.includes(", la") || c.includes("louisiana")) return "Louisiana";
  // Catch-all for any other TX city
  if (c.includes(", tx")) return "Other TX";
  return "Other";
}

// Only include regions that have taco spots, plus out-of-state tour date states
const TACO_REGIONS = [...new Set(TACO_SPOTS.map(s => getRegion(s.city)))].sort();
const OUT_OF_STATE = ["Tennessee", "Georgia", "Oklahoma", "Louisiana"];
const TOUR_STATE_REGIONS = [...new Set(TOUR_DATES.map(d => getRegion(d.city)).filter(r => OUT_OF_STATE.includes(r)))];
const ALL_REGIONS = [...TACO_REGIONS, ...TOUR_STATE_REGIONS.filter(r => !TACO_REGIONS.includes(r))].sort();

const ratingColor = (r) => r >= 9 ? "#E8B100" : r >= 8 ? "#4ADE80" : r >= 7 ? "#60A5FA" : "#FB923C";
const ratingLabel = (r) => r >= 9.5 ? "LEGENDARY" : r >= 9 ? "FIRE" : r >= 8 ? "SOLID" : r >= 7 ? "DECENT" : "MEH";

// --- SCREENS -----------------------------------------------------------

// 1. SPLASH / ONBOARDING
function SplashScreen({ onGetStarted }) {
  const [step, setStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => { setTimeout(() => setFadeIn(true), 100); }, []);

  const slides = [
    {
      emoji: "🌮🎸",
      title: "Welcome to Rich's Taco Tour",
      subtitle: "Where Texas Country meets the best tacos on the road",
      detail: "Follow Rich O'Toole as he eats his way across every tour stop",
    },
    {
      emoji: "📍",
      title: "Discover. Rate. Debate.",
      subtitle: "See Rich's reviews on an interactive map",
      detail: "Agree or disagree with his takes. Submit your own reviews. Climb the leaderboard.",
    },
    {
      emoji: "🎶",
      title: "Tacos + Tunes",
      subtitle: "Tour dates, Spotify playlists, and merch — all in one place",
      detail: "God, Texas & Tacos isn't just a slogan. It's a lifestyle.",
    },
  ];

  const s = slides[step];
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 32, textAlign: "center", opacity: fadeIn ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ fontSize: 56, marginBottom: 20, filter: "drop-shadow(0 0 20px rgba(232,177,0,0.3))" }}>{s.emoji}</div>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", fontFamily: "'Bitter', serif", margin: "0 0 8px", lineHeight: 1.2 }}>{s.title}</h1>
      <p style={{ fontSize: 14, color: "#E8B100", fontWeight: 600, margin: "0 0 8px" }}>{s.subtitle}</p>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 32px", maxWidth: 280, lineHeight: 1.5 }}>{s.detail}</p>
      {/* Dots */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {slides.map((_, i) => (
          <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i === step ? "#E8B100" : "rgba(255,255,255,0.15)", transition: "all 0.3s" }} />
        ))}
      </div>
      {step < slides.length - 1 ? (
        <button onClick={() => setStep(step + 1)} style={{ ...btnPrimary, width: 200 }}>Next</button>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          <button onClick={() => onGetStarted("signup")} style={{ ...btnPrimary }}>Create Account</button>
          <button onClick={() => onGetStarted("login")} style={{ ...btnSecondary }}>I already have one</button>
          <button onClick={() => onGetStarted("guest")} style={{ border: "none", background: "none", color: "#666", fontSize: 12, cursor: "pointer", padding: 8, fontFamily: "inherit" }}>Continue as guest</button>
        </div>
      )}
    </div>
  );
}

// 2. AUTH SCREEN (Login / Signup)
function AuthScreen({ mode, onComplete, onBack }) {
  const [authMode, setAuthMode] = useState(mode);
  const [form, setForm] = useState({ name: "", email: "", password: "", city: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      onComplete({ name: form.name || "Taco Fan", email: form.email, city: form.city || "Texas" });
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "60px 24px 24px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#666", fontSize: 12, cursor: "pointer", marginBottom: 24, fontFamily: "inherit" }}>← Back</button>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: "'Bitter', serif", margin: "0 0 4px" }}>
        {authMode === "signup" ? "Join the Tour" : "Welcome Back"}
      </h1>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 28px" }}>
        {authMode === "signup" ? "Create your account to rate tacos and debate Rich" : "Sign in to your Taco Tour account"}
      </p>

      {/* Social auth buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {[
          { label: "Continue with Apple", icon: "🍎", bg: "#fff", color: "#000" },
          { label: "Continue with Google", icon: "G", bg: "transparent", color: "#fff", border: true },
          { label: "Continue with Spotify", icon: "♫", bg: "#1DB954", color: "#000" },
        ].map((btn) => (
          <button key={btn.label} onClick={handleSubmit} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "12px 0", borderRadius: 10,
            background: btn.bg, color: btn.color, border: btn.border ? "1px solid rgba(255,255,255,0.2)" : "none",
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>
            <span>{btn.icon}</span> {btn.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        <span style={{ fontSize: 11, color: "#555" }}>or</span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Form fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {authMode === "signup" && (
          <input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle} />
        )}
        <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
          style={inputStyle} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
          style={inputStyle} />
        {authMode === "signup" && (
          <input placeholder="Home city (for local taco recs)" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
            style={inputStyle} />
        )}
        <button onClick={handleSubmit} disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.6 : 1 }}>
          {loading ? "Loading..." : authMode === "signup" ? "Create Account" : "Sign In"}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
          style={{ background: "none", border: "none", color: "#E8B100", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
          {authMode === "signup" ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}

// 3. MAP VIEW
const MAPKIT_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6IlAzNUtLS0M5TFEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiI5UzM3MldHUFI0IiwiaWF0IjoxNzcyNTg4MjIzLCJleHAiOjE4MDQxMjQyMjMsIm9yaWdpbiI6IioifQ.CNUY_VFZhmEUUz7q6GBTZYZWL8rahOY_Lp_Abit1ymMecab4AoL3Bdmt6KZPdjXkSgN33_V7DGhXP3ijD_6HiA";

function MapView({ spots, onSelectSpot, selectedSpot, showTourDates }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tourAnnsRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(null);
  const onSelectSpotRef = useRef(onSelectSpot);
  onSelectSpotRef.current = onSelectSpot;

  useEffect(() => {
    let cancelled = false;
    function initMap() {
      try {
        if (!window.mapkit || cancelled) return;
        if (!mapkit.maps || mapkit.maps.length === 0) {
          mapkit.init({ authorizationCallback: (done) => done(MAPKIT_TOKEN) });
        }
        if (mapInstanceRef.current) { mapInstanceRef.current.destroy(); }
        const map = new mapkit.Map(mapRef.current, {
          center: new mapkit.Coordinate(32.0, -97.0),
          region: new mapkit.CoordinateRegion(
            new mapkit.Coordinate(32.0, -97.0),
            new mapkit.CoordinateSpan(8, 12)
          ),
          showsCompass: mapkit.FeatureVisibility.Hidden,
          showsZoomControl: false,
          showsMapTypeControl: false,
          colorScheme: mapkit.Map.ColorSchemes.Dark,
          isScrollEnabled: true,
          isZoomEnabled: true,
        });
        mapInstanceRef.current = map;
        spots.forEach((spot) => {
          const coord = new mapkit.Coordinate(spot.lat, spot.lng);
          const ann = new mapkit.MarkerAnnotation(coord, {
            title: spot.name,
            subtitle: "Rich: " + spot.richRating + " \u00B7 Fans: " + spot.fanRating,
            color: "#22C55E",
            glyphColor: "#000",
            glyphText: "\uD83C\uDF2E",
          });
          ann.addEventListener("select", () => onSelectSpotRef.current(spot));
          map.addAnnotation(ann);
        });
        // Tour date pins - blue circle with white lone star
        const seen = {};
        const tourEls = [];
        const tourAnns = [];
        TOUR_DATES.forEach((td) => {
          if (!td.lat || !td.lng) return;
          const key = td.lat + "," + td.lng;
          if (seen[key]) return;
          seen[key] = true;
          const coord = new mapkit.Coordinate(td.lat, td.lng);
          const ann = new mapkit.Annotation(coord, (coordinate, options) => {
            const el = document.createElement("div");
            el.style.cssText = "display:flex;flex-direction:column;align-items:center;cursor:pointer;position:relative;transition:transform 0.3s;";
            const pin = document.createElement("div");
            pin.style.cssText = "width:22px;height:22px;border-radius:50%;background:#C41E3A;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,0.5);transition:all 0.3s;";
            pin.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>';
            el.appendChild(pin);
            const label = document.createElement("div");
            label.style.cssText = "background:rgba(0,0,0,0.8);color:#fff;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;margin-top:2px;white-space:nowrap;font-family:system-ui;letter-spacing:0.3px;display:none;transition:opacity 0.3s;";
            label.textContent = td.day + " " + td.date;
            el.appendChild(label);
            const bubble = document.createElement("div");
            bubble.style.cssText = "display:none;position:absolute;bottom:56px;left:50%;transform:translateX(-50%);background:rgba(13,13,20,0.95);border:1px solid rgba(0,40,104,0.5);border-radius:10px;padding:8px 12px;white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.6);z-index:50;min-width:140px;text-align:center;";
            bubble.innerHTML = "<div style='font-size:12px;font-weight:700;color:#fff;'>" + td.venue + "</div><div style='font-size:10px;color:#ccc;margin-top:2px;'>" + td.city + "</div><div style='font-size:9px;color:#5B9BD5;margin-top:3px;font-weight:700;'>♪ " + td.day + " " + td.date + "</div>";
            const arrow = document.createElement("div");
            arrow.style.cssText = "position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(13,13,20,0.95);";
            bubble.appendChild(arrow);
            el.appendChild(bubble);
            el._bubble = bubble;
            el._pin = pin;
            el._label = label;
            tourEls.push(el);
            return el;
          }, { anchorOffset: new DOMPoint(0, -10) });
          ann.addEventListener("select", (e) => {
            const el = e.target.element;
            if (el && el._bubble) { el._bubble.style.display = "block"; el._pin.style.transform = "scale(1.4)"; }
          });
          ann.addEventListener("deselect", (e) => {
            const el = e.target.element;
            if (el && el._bubble) { el._bubble.style.display = "none"; el._pin.style.transform = "scale(1)"; }
          });
          map.addAnnotation(ann);
          tourAnns.push(ann);
        });
        tourAnnsRef.current = tourAnns;
        // Listen for zoom changes to scale tour pins
        map.addEventListener("region-change-end", () => {
          const span = map.region.span;
          const zoomed = span.latitudeDelta < 3;
          const veryZoomed = span.latitudeDelta < 1.5;
          tourEls.forEach(el => {
            if (veryZoomed) {
              el._pin.style.width = "28px"; el._pin.style.height = "28px"; el._pin.style.fontSize = "15px";
              el._label.style.display = "block"; el._label.style.fontSize = "9px";
            } else if (zoomed) {
              el._pin.style.width = "25px"; el._pin.style.height = "25px"; el._pin.style.fontSize = "13px";
              el._label.style.display = "block"; el._label.style.fontSize = "8px";
            } else {
              el._pin.style.width = "22px"; el._pin.style.height = "22px"; el._pin.style.fontSize = "12px";
              el._label.style.display = "none";
            }
          });
        });
        if (!cancelled) setMapReady(true);
      } catch (e) {
        if (!cancelled) setMapError(e.message);
      }
    }
    if (window.mapkit) { initMap(); return () => { cancelled = true; }; }
    if (document.getElementById("mapkit-script")) {
      const iv = setInterval(() => { if (window.mapkit) { clearInterval(iv); initMap(); } }, 200);
      return () => { cancelled = true; clearInterval(iv); };
    }
    const s = document.createElement("script");
    s.id = "mapkit-script";
    s.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js";
    s.crossOrigin = "anonymous";
    s.onload = () => initMap();
    s.onerror = () => { if (!cancelled) setMapError("Failed to load Apple Maps SDK"); };
    document.head.appendChild(s);
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedSpot) return;
    mapInstanceRef.current.setCenterAnimated(
      new mapkit.Coordinate(selectedSpot.lat, selectedSpot.lng), true
    );
  }, [selectedSpot]);

  // Toggle tour date pins visibility
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !tourAnnsRef.current.length) return;
    tourAnnsRef.current.forEach(ann => {
      if (showTourDates) {
        if (!map.annotations.includes(ann)) map.addAnnotation(ann);
      } else {
        map.removeAnnotation(ann);
      }
    });
  }, [showTourDates]);

  return (
    <div className="map-container" style={{ position: "relative", width: "100%", height: 400, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(232,177,0,0.15)" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {/* Overlay labels */}
      <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", padding: "5px 10px", borderRadius: 6, fontSize: 10, color: "#999", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Courier Prime', monospace", zIndex: 10, pointerEvents: "none" }}>
         Apple Maps
      </div>
      <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", padding: "5px 10px", borderRadius: 6, fontSize: 10, color: "#E8B100", zIndex: 10, pointerEvents: "none" }}>
        {spots.length} spots · {TOUR_DATES.length} shows
      </div>
      {/* Legend */}
      <div style={{ position: "absolute", bottom: selectedSpot ? 140 : 12, left: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", padding: "6px 10px", borderRadius: 6, fontSize: 9, color: "#aaa", zIndex: 10, pointerEvents: "none", display: "flex", flexDirection: "column", gap: 3, transition: "bottom 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E", display: "inline-block" }}></span> Taco Spots</div>
        {showTourDates && <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#C41E3A", display: "inline-block", border: "1px solid #fff", fontSize: 6, color: "#fff", textAlign: "center", lineHeight: "10px" }}>♪</span> Tour Dates</div>}
      </div>
      {/* Selected spot card */}
      {selectedSpot && (
        <div style={{
          position: "absolute", bottom: 12, left: 12, right: 12, zIndex: 20,
          background: "rgba(0,0,0,0.88)", backdropFilter: "blur(16px)",
          border: "1px solid " + ratingColor(selectedSpot.richRating) + "44",
          borderRadius: 14, padding: "12px 16px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", fontFamily: "'Bitter', serif" }}>{selectedSpot.name}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{selectedSpot.city}</div>
              {selectedSpot.tags && <div style={{ display: "flex", gap: 4, marginTop: 4 }}>{selectedSpot.tags.map(t => <span key={t} style={{ fontSize: 9, color: "#aaa", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4 }}>{t}</span>)}</div>}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: ratingColor(selectedSpot.richRating), fontFamily: "'Bitter', serif" }}>{selectedSpot.richRating}</div>
                <div style={{ fontSize: 8, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Rich</div>
              </div>
              <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.1)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#60A5FA", fontFamily: "'Bitter', serif" }}>{selectedSpot.fanRating}</div>
                <div style={{ fontSize: 8, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Fans</div>
              </div>
            </div>
          </div>
          {selectedSpot.richQuote && <div style={{ fontSize: 11, color: "#ccc", fontStyle: "italic", marginTop: 8 }}>"{selectedSpot.richQuote}"</div>}
          {selectedSpot.trending && <div style={{ fontSize: 9, color: "#E8B100", marginTop: 6 }}>🔥 TRENDING</div>}
          <div onClick={() => onSelectSpot(null)} style={{ position: "absolute", top: 8, right: 12, fontSize: 16, color: "#666", cursor: "pointer" }}>✕</div>
        </div>
      )}
      {!mapReady && !mapError && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", zIndex: 5 }}>
          <div style={{ color: "#E8B100", fontSize: 13 }}>Loading Apple Maps...</div>
        </div>
      )}
      {mapError && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.8)", color: "#EF4444", fontSize: 12, zIndex: 30 }}>
          Map error: {mapError}
        </div>
      )}
    </div>
  );
}

// 4b. SHARE SECTION — pre-generates image on mount, instant share on tap
function ShareSection({ spot }) {
  const cardRef = useRef(null);
  const cachedFile = useRef(null);
  const [ready, setReady] = useState(false);

  // Pre-generate the share image as soon as this section mounts (card expanded)
  useEffect(() => {
    let cancelled = false;
    const generate = async () => {
      try {
        if (!cardRef.current) return;
        // Small delay to let the hidden card render in DOM
        await new Promise(r => setTimeout(r, 100));
        if (cancelled || !cardRef.current) return;
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: "#0d0d14", scale: 2, useCORS: true, logging: false, windowWidth: 400,
        });
        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        if (blob && !cancelled) {
          cachedFile.current = new File([blob], "taco-tour-review.png", { type: "image/png", lastModified: Date.now() });
          setReady(true);
        }
      } catch (e) {
        console.error("Image pre-gen failed:", e);
        // Share will still work, just without image
        setReady(true);
      }
    };
    generate();
    return () => { cancelled = true; };
  }, [spot.id]);

  // Share handler — no async work before navigator.share, image is pre-cached
  const handleShare = useCallback(async () => {
    const shareText = `🌮 ${spot.name} — @RichOToole gave it a ${spot.richRating}! "${spot.richQuote}"`;
    const shareUrl = "https://tacos-lime.vercel.app";
    const shareData = { title: spot.name, text: shareText, url: shareUrl };

    // Attach cached image if available and supported
    if (cachedFile.current) {
      try {
        if (navigator.canShare && navigator.canShare({ files: [cachedFile.current] })) {
          shareData.files = [cachedFile.current];
        }
      } catch {}
    }

    try {
      await navigator.share(shareData);
    } catch (e) {
      if (e.name !== "AbortError") console.error("Share error:", e);
    }
  }, [spot]);

  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 }}>
      {/* Hidden branded share card — rendered in DOM but invisible, for html2canvas */}
      <div style={{ position: "fixed", left: 0, top: 0, opacity: 0, pointerEvents: "none", zIndex: -1 }}>
        <div ref={cardRef} style={{ width: 400, fontFamily: "system-ui, -apple-system, sans-serif", background: "#0d0d14" }}>
          <div style={{ height: 4, background: "linear-gradient(90deg, #E8B100, #D97706, #E8B100)" }} />
          <div style={{ padding: "24px 28px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: 22 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #E8B100, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#000" }}>R</div>
              <div>
                <div style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>Rich O'Toole</div>
                <div style={{ fontSize: 11, color: "#E8B100", fontWeight: 600 }}>Taco Tour</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 28 }}>🌮</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 4 }}>{spot.name}</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>{spot.city}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: 24, padding: "16px 20px", background: "rgba(255,255,255,0.04)", borderRadius: 12 }}>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: ratingColor(spot.richRating), lineHeight: 1 }}>{spot.richRating}</div>
                <div style={{ fontSize: 10, color: "#E8B100", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, marginTop: 6 }}>Rich Says</div>
              </div>
              <div style={{ fontSize: 18, color: "#444", fontWeight: 300, paddingBottom: 14 }}>vs</div>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: "#60A5FA", lineHeight: 1 }}>{spot.fanRating}</div>
                <div style={{ fontSize: 10, color: "#60A5FA", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, marginTop: 6 }}>Fans Say</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: "#ccc", fontStyle: "italic", lineHeight: 1.6, marginBottom: 22, paddingLeft: 14, borderLeft: "3px solid #E8B100" }}>&ldquo;{spot.richQuote}&rdquo;</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#E8B100", fontWeight: 700 }}>richstacotour.com</div>
              <div style={{ fontSize: 11, color: "#666" }}>Tag @RichOToole</div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleShare} disabled={!ready} style={{
        width: "100%", padding: "12px 0", borderRadius: 10,
        border: "1px solid rgba(232,177,0,0.3)",
        background: "linear-gradient(135deg, rgba(232,177,0,0.12), rgba(232,177,0,0.04))",
        color: "#E8B100", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        letterSpacing: 0.5, opacity: ready ? 1 : 0.5,
      }}>
        {ready ? "📲 Share This Take" : "Preparing share..."}
      </button>
      <div style={{ textAlign: "center", marginTop: 4, fontSize: 9, color: "#555" }}>
        {ready && cachedFile.current ? "Image + text ready · tag @RichOToole 🔥" : "Tag @RichOToole 🔥"}
      </div>
    </div>
  );
}

// 4. REVIEW CARD (compact + expanded)
function ReviewCard({ spot, userVote, onVote, onFanRate, fanRatingSubmitted, expanded, onToggle, user }) {
  const diff = Math.abs(spot.richRating - spot.fanRating);
  const hotTake = diff > 0.5;
  const [sliderVal, setSliderVal] = useState(spot.fanRating);
  const [showSlider, setShowSlider] = useState(false);

  // Show slider when user disagrees
  const handleDisagree = () => {
    onVote(spot.id, "disagree");
    setShowSlider(true);
    setSliderVal(spot.fanRating);
  };

  const handleAgree = () => {
    onVote(spot.id, "agree");
    setShowSlider(false);
  };

  return (
    <div onClick={onToggle} style={{
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 14, padding: 16, cursor: "pointer", transition: "all 0.2s",
      borderLeft: `3px solid ${ratingColor(spot.richRating)}`,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "'Bitter', serif" }}>{spot.name}</span>
            {spot.trending && <span style={badgeStyle("#E8B100")}>TRENDING</span>}
            {hotTake && <span style={badgeStyle("#EF4444")}>HOT TAKE</span>}
          </div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>{spot.city} · {spot.reviewDate}</div>
          <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
            {spot.tags.map(t => <span key={t} style={{ fontSize: 10, color: "#888", background: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: 20 }}>{t}</span>)}
          </div>
        </div>
        <div style={{ textAlign: "center", minWidth: 54 }}>
          <div style={{ fontSize: 30, fontWeight: 900, color: ratingColor(spot.richRating), fontFamily: "'Bitter', serif", lineHeight: 1 }}>{spot.richRating}</div>
          <div style={{ fontSize: 8, color: ratingColor(spot.richRating), textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginTop: 2 }}>{ratingLabel(spot.richRating)}</div>
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }} onClick={e => e.stopPropagation()}>
          {/* Rich's take */}
          <div style={{ background: "rgba(232,177,0,0.05)", borderRadius: 10, padding: 12, marginBottom: 14, borderLeft: "2px solid #E8B100" }}>
            <div style={{ fontSize: 12, color: "#ddd", fontStyle: "italic", lineHeight: 1.6 }}>"{spot.richQuote}"</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #E8B100, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: "#000" }}>R</div>
              <span style={{ fontSize: 11, color: "#E8B100", fontWeight: 600 }}>Rich O'Toole</span>
            </div>
          </div>

          {/* Photo Gallery */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
              {(spot.images || [0, 1, 2]).map((img, i) => (
                <div key={i} style={{
                  flex: i === 0 ? "0 0 65%" : "0 0 30%", height: i === 0 ? 160 : 76,
                  borderRadius: 10, position: "relative", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: "#111",
                }}>
                  {typeof img === "string" ? (
                    <img src={img} alt={`${spot.name} photo ${i + 1}`} style={{
                      width: "100%", height: "100%", objectFit: "cover", display: "block",
                    }} />
                  ) : (
                    <div style={{
                      width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: `linear-gradient(${120 + i * 40}deg, rgba(232,177,0,${0.08 + i * 0.03}), rgba(${50 + spot.id * 20},${30 + i * 15},${10 + i * 20},0.4))`,
                    }}>
                      <span style={{ fontSize: i === 0 ? 48 : 28, opacity: 0.6 }}>🌮</span>
                    </div>
                  )}
                  {i === 0 && (
                    <>
                      <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg, #E8B100, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 900, color: "#000" }}>R</div>
                        <span style={{ fontSize: 9, color: "#fff", fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>Rich O'Toole</span>
                      </div>
                      <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 9, color: "#ccc", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>📸 {spot.name}</div>
                      <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: 8, color: "#999", background: "rgba(0,0,0,0.5)", padding: "2px 6px", borderRadius: 4 }}>📷 {spot.reviewDate}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
              <span style={{ fontSize: 9, color: "#666" }}>{spot.images ? spot.images.length : 3} photos</span>
            </div>
          </div>

          {/* Rating comparison */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#E8B100", fontWeight: 700 }}>🌮 Rich: {spot.richRating}</span>
              <span style={{ fontSize: 11, color: "#60A5FA", fontWeight: 700 }}>👥 Fans: {spot.fanRating}</span>
            </div>
            <div style={{ display: "flex", gap: 4, height: 8, background: "rgba(255,255,255,0.03)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${(spot.richRating / 10) * 100}%`, background: `linear-gradient(90deg, ${ratingColor(spot.richRating)}, ${ratingColor(spot.richRating)}66)`, borderRadius: 4, transition: "width 0.5s" }} />
            </div>
            <div style={{ display: "flex", gap: 4, height: 8, background: "rgba(255,255,255,0.03)", borderRadius: 4, overflow: "hidden", marginTop: 4 }}>
              <div style={{ width: `${(spot.fanRating / 10) * 100}%`, background: "linear-gradient(90deg, #60A5FA, #60A5FA66)", borderRadius: 4, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 10, color: "#555", marginTop: 4, textAlign: "right" }}>{spot.fanVotes.toLocaleString()} fan votes</div>
          </div>

          {/* Vote buttons */}
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <button onClick={handleAgree} style={{
              ...voteBtn, background: userVote === "agree" ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.04)",
              color: userVote === "agree" ? "#4ADE80" : "#888", border: userVote === "agree" ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.06)",
            }}>🤝 Agree{userVote === "agree" ? "d" : ""} with Rich</button>
            <button onClick={handleDisagree} style={{
              ...voteBtn, background: userVote === "disagree" ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.04)",
              color: userVote === "disagree" ? "#EF4444" : "#888", border: userVote === "disagree" ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.06)",
            }}>🌶️ Wrong, Rich!</button>
          </div>

          {/* Agree confirmation with tally */}
          {userVote === "agree" && (
            <div style={{
              background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)",
              borderRadius: 10, padding: 10, marginBottom: 8,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 11, color: "#4ADE80", fontWeight: 700 }}>✓ You agreed with Rich's {spot.richRating}</span>
              <span style={{ fontSize: 10, color: "#4ADE80" }}>👥 {(spot.fanVotes + 1).toLocaleString()} fans agree</span>
            </div>
          )}

          {/* Fan rating slider — appears on disagree */}
          {(showSlider || userVote === "disagree") && !fanRatingSubmitted && (
            <div style={{
              background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)",
              borderRadius: 12, padding: 14, marginBottom: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 10, color: "#60A5FA", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Your Rating</span>
                <span style={{ fontSize: 28, fontWeight: 900, color: ratingColor(sliderVal), fontFamily: "'Bitter', serif", lineHeight: 1 }}>{sliderVal.toFixed(1)}</span>
              </div>

              {/* Slider track */}
              <div style={{ position: "relative", marginBottom: 10 }}>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={sliderVal}
                  onChange={e => setSliderVal(parseFloat(e.target.value))}
                  style={{
                    width: "100%", height: 6, appearance: "none", WebkitAppearance: "none",
                    background: `linear-gradient(90deg, ${ratingColor(sliderVal)} ${((sliderVal - 1) / 9) * 100}%, rgba(255,255,255,0.08) ${((sliderVal - 1) / 9) * 100}%)`,
                    borderRadius: 3, outline: "none", cursor: "pointer",
                  }}
                />
                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none; appearance: none;
                    width: 22px; height: 22px; border-radius: 50%;
                    background: #fff; border: 3px solid #60A5FA;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                    cursor: pointer;
                  }
                `}</style>
              </div>

              {/* Scale labels */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 8, color: "#EF4444" }}>1</span>
                <span style={{ fontSize: 8, color: "#F97316" }}>3</span>
                <span style={{ fontSize: 8, color: "#E8B100" }}>5</span>
                <span style={{ fontSize: 8, color: "#E8B100" }}>7</span>
                <span style={{ fontSize: 8, color: "#22C55E" }}>9</span>
                <span style={{ fontSize: 8, color: "#22C55E" }}>10</span>
              </div>

              {/* Rich vs You comparison */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#E8B100", fontWeight: 600, marginBottom: 2 }}>Rich</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: ratingColor(spot.richRating), fontFamily: "'Bitter', serif" }}>{spot.richRating}</div>
                </div>
                <span style={{ fontSize: 11, color: "#444" }}>vs</span>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: "#60A5FA", fontWeight: 600, marginBottom: 2 }}>You</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: ratingColor(sliderVal), fontFamily: "'Bitter', serif" }}>{sliderVal.toFixed(1)}</div>
                </div>
                {Math.abs(spot.richRating - sliderVal) > 2 && (
                  <span style={{ fontSize: 9, color: "#EF4444", fontWeight: 700, background: "rgba(239,68,68,0.1)", padding: "2px 6px", borderRadius: 4 }}>🌶️ HOT TAKE</span>
                )}
              </div>

              <button
                onClick={() => { if (onFanRate) onFanRate(spot.id, sliderVal); }}
                style={{
                  width: "100%", padding: "10px 0", borderRadius: 8,
                  border: "none", background: "#60A5FA", color: "#000",
                  fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
                  letterSpacing: 0.5,
                }}
              >
                Submit My Rating
              </button>
            </div>
          )}

          {/* Submitted confirmation */}
          {fanRatingSubmitted && userVote === "disagree" && (
            <div style={{
              background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)",
              borderRadius: 10, padding: 10, marginBottom: 8, textAlign: "center",
            }}>
              <span style={{ fontSize: 11, color: "#4ADE80", fontWeight: 700 }}>✓ Your rating of {fanRatingSubmitted.toFixed(1)} has been submitted!</span>
            </div>
          )}

          {/* Share This Take — generates image + shares */}
          <ShareSection spot={spot} />

          {/* Tour date callout */}
          {spot.tourDate && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(232,177,0,0.04)", borderRadius: 10, border: "1px solid rgba(232,177,0,0.1)" }}>
              <span style={{ fontSize: 16 }}>🎸</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Nearby Show</div>
                <div style={{ fontSize: 11, color: "#ccc" }}>{spot.tourDate}</div>
              </div>
              <button style={{ fontSize: 10, color: "#000", background: "#E8B100", border: "none", padding: "5px 10px", borderRadius: 5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>TICKETS</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 6. FAN REVIEW SUBMISSION
function FanReviewForm({ user, onClose }) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌮</div>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Bitter', serif", margin: "0 0 8px" }}>Take Submitted!</h2>
        <p style={{ fontSize: 12, color: "#888", margin: "0 0 20px" }}>Your review is live. Let's see if Rich agrees.</p>
        <div style={{ background: "rgba(232,177,0,0.06)", borderRadius: 10, padding: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: "#999" }}>+15 XP earned · Review #{Math.floor(Math.random() * 50) + 1} for you</div>
        </div>
        <button onClick={onClose} style={btnPrimary}>Back to Reviews</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🌮 Submit Your Taco Take</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input placeholder="Taco spot name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
        <input placeholder="City, State" value={city} onChange={e => setCity(e.target.value)} style={inputStyle} />
        {/* Rating selector */}
        <div>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>Your rating</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[...Array(10)].map((_, i) => {
              const val = i + 1;
              return (
                <button key={val} onClick={() => setRating(val)} style={{
                  width: 36, height: 36, borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
                  background: rating === val ? ratingColor(val) : "rgba(255,255,255,0.05)",
                  color: rating === val ? "#000" : "#777", transition: "all 0.15s", fontFamily: "inherit",
                }}>{val}</button>
              );
            })}
          </div>
          {rating > 0 && (
            <div style={{ fontSize: 11, color: ratingColor(rating), fontWeight: 700, marginTop: 6 }}>
              {ratingLabel(rating)} {rating >= 9 ? "🔥" : rating >= 8 ? "👌" : ""}
            </div>
          )}
        </div>
        <textarea placeholder="What's your take? (optional)" value={comment} onChange={e => setComment(e.target.value)}
          rows={3} style={{ ...inputStyle, resize: "none", minHeight: 70 }} />
        <button onClick={() => name && rating && setSubmitted(true)} disabled={!name || !rating}
          style={{ ...btnPrimary, opacity: (!name || !rating) ? 0.4 : 1 }}>
          Submit Your Take
        </button>
      </div>
    </div>
  );
}

// 7. POLL WIDGET
function PollWidget({ debate, onVote, userVote }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
      <div style={{ fontSize: 10, color: "#EF4444", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>🔥 Fan Debate</div>
      <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "'Bitter', serif", marginBottom: 12, lineHeight: 1.4 }}>{debate.question}</div>
      {debate.options.map((opt, i) => (
        <button key={i} onClick={() => onVote(debate.id, i)} style={{
          width: "100%", marginBottom: 6, padding: "10px 14px", borderRadius: 8, border: "none",
          cursor: "pointer", position: "relative", overflow: "hidden", textAlign: "left",
          background: userVote !== null ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)", fontFamily: "inherit",
        }}>
          {userVote !== null && (
            <div style={{ position: "absolute", inset: "0 auto 0 0", width: `${opt.pct}%`, background: userVote === i ? "rgba(232,177,0,0.12)" : "rgba(255,255,255,0.02)", transition: "width 0.6s" }} />
          )}
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: userVote === i ? "#E8B100" : "#ccc", fontWeight: userVote === i ? 700 : 400 }}>{opt.label}</span>
            {userVote !== null && <span style={{ fontSize: 12, color: "#666", fontWeight: 700 }}>{opt.pct}%</span>}
          </div>
        </button>
      ))}
      <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>{debate.totalVotes.toLocaleString()} votes</div>
    </div>
  );
}

// 8. TOUR DATES
function TourSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>🎸 Tour Dates via Bandsintown</div>
        <a href="https://www.bandsintown.com/a/39860-rich-otoole" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "#555", textDecoration: "none" }}>See all →</a>
      </div>
      {TOUR_DATES.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12 }}>
          <div style={{ minWidth: 50, textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase" }}>{d.day}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#E8B100", fontFamily: "'Bitter', serif" }}>{d.date.split(" ")[1]}</div>
            <div style={{ fontSize: 9, color: "#666" }}>{d.date.split(" ")[0]}</div>
          </div>
          <div style={{ flex: 1, borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: 12 }}>
            <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "'Bitter', serif" }}>{d.venue}</div>
            <div style={{ fontSize: 12, color: "#ccc", fontWeight: 500, marginTop: 2 }}>{d.city}</div>
            <div style={{ fontSize: 10, color: "#E8B100", marginTop: 3 }}>🌮 {d.tacoHunt}</div>
            {d.rsvp > 0 && <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{d.rsvp} fans going</div>}
          </div>
          <div>
            {d.soldOut ? (
              <span style={{ fontSize: 9, color: "#EF4444", fontWeight: 700, border: "1px solid rgba(239,68,68,0.25)", padding: "4px 8px", borderRadius: 6 }}>SOLD OUT</span>
            ) : (
              <button style={{ fontSize: 10, color: "#000", fontWeight: 800, background: "#E8B100", border: "none", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>RSVP</button>
            )}
          </div>
        </div>
      ))}
      {/* Merch callout */}
      <a href="https://godtexasandtacos.com" target="_blank" rel="noopener noreferrer" style={{
        display: "flex", alignItems: "center", gap: 12, padding: 14, background: "rgba(232,177,0,0.04)", border: "1px solid rgba(232,177,0,0.12)", borderRadius: 12, textDecoration: "none",
      }}>
        <span style={{ fontSize: 24 }}>🤠</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: "#fff", fontWeight: 700 }}>God, Texas & Tacos Merch</div>
          <div style={{ fontSize: 10, color: "#888" }}>Official Rich O'Toole store</div>
        </div>
        <span style={{ fontSize: 11, color: "#E8B100" }}>Shop →</span>
      </a>
    </div>
  );
}

// 9. SPOTIFY / MUSIC
function SpotifyEmbed({ src, title, fallbackUrl, fallbackLabel }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { if (!loaded) setError(true); }, 6000);
    return () => clearTimeout(timer);
  }, [loaded]);
  return (
    <div style={{ position: "relative", minHeight: error && !loaded ? 80 : 352 }}>
      {!error && (
        <iframe
          style={{ borderRadius: 12, border: "none", width: "100%", height: 352, opacity: loaded ? 1 : 0.3, transition: "opacity 0.5s" }}
          src={src}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      )}
      {!loaded && !error && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: "#555", fontSize: 11 }}>Loading player...</div>
      )}
      {error && !loaded && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 20 }}>
          <div style={{ fontSize: 11, color: "#888" }}>Player unavailable</div>
          <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" style={{
            background: "#1DB954", color: "#000", fontWeight: 800, fontSize: 12, padding: "10px 24px", borderRadius: 20, textDecoration: "none",
          }}>{fallbackLabel || "Listen on Spotify"}</a>
        </div>
      )}
    </div>
  );
}

function MusicSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Real Spotify Artist embed - plays 30s previews in browser */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 12, paddingBottom: 4 }}>
        <div style={{ fontSize: 10, color: "#1DB954", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>♫ Now Playing</div>
        <SpotifyEmbed
          src="https://open.spotify.com/embed/artist/2t6FHAUXxi9eiatP2Mavh0?utm_source=generator&theme=0"
          fallbackUrl="https://open.spotify.com/artist/2t6FHAUXxi9eiatP2Mavh0"
          fallbackLabel="Open Rich O'Toole on Spotify"
        />
      </div>

      {/* Latest album Spotify embed */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 12, paddingBottom: 4 }}>
        <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🎵 Latest Album</div>
        <SpotifyEmbed
          src="https://open.spotify.com/embed/album/54Q7cSAqRRUzbtxP2WoFm6?utm_source=generator&theme=0"
          fallbackUrl="https://open.spotify.com/album/54Q7cSAqRRUzbtxP2WoFm6"
          fallbackLabel="Play God Is a Gentleman"
        />
      </div>

      {/* Discography */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 12, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>🎵 Full Discography · {ALBUMS.length} Albums</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ALBUMS.map((a, i) => {
            return (
              <a key={a.title} href={a.spotifyUrl} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 12, padding: 10, borderRadius: 10, textDecoration: "none",
                background: a.current ? "rgba(232,177,0,0.08)" : "rgba(255,255,255,0.02)",
                border: a.current ? "1px solid rgba(232,177,0,0.25)" : "1px solid rgba(255,255,255,0.04)",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 6, flexShrink: 0, overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#1a1a2e",
                }}>
                  {a.art ? <img src={a.art} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤠</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: a.current ? "#E8B100" : "#eee", fontWeight: 700, fontFamily: "'Bitter', serif" }}>{a.title}</div>
                  <div style={{ fontSize: 10, color: "#777", marginTop: 2 }}>{a.year} · {RICH.label}</div>
                </div>
                {a.current && <span style={{ fontSize: 8, color: "#E8B100", background: "rgba(232,177,0,0.15)", padding: "3px 8px", borderRadius: 4, fontWeight: 700 }}>NEW</span>}
                <span style={{ fontSize: 9, color: "#1DB954", fontWeight: 700 }}>Play</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 10. PROFILE / ACCOUNT
function ProfileSection({ user, onLogout }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #E8B100, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#000", margin: "0 auto 10px" }}>
          {(user?.name || "T")[0].toUpperCase()}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Bitter', serif" }}>{user?.name || "Taco Fan"}</div>
        <div style={{ fontSize: 11, color: "#888" }}>{user?.city || "Texas"} · Joined Mar 2026</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 14 }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: "#E8B100" }}>0</div><div style={{ fontSize: 9, color: "#666" }}>Reviews</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: "#4ADE80" }}>0</div><div style={{ fontSize: 9, color: "#666" }}>Agrees</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: "#60A5FA" }}>0</div><div style={{ fontSize: 9, color: "#666" }}>XP</div></div>
        </div>
      </div>

      {/* Badges */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>🏆 Badges to Earn</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { icon: "🌮", name: "First Take", desc: "Submit your first review", locked: true },
            { icon: "🔥", name: "Hot Streak", desc: "5 reviews in a row", locked: true },
            { icon: "🤠", name: "Rich Approved", desc: "Rich agrees with your take", locked: true },
            { icon: "⭐", name: "Top 10", desc: "Hit the leaderboard", locked: true },
            { icon: "🗺️", name: "Explorer", desc: "Review in 3 cities", locked: true },
            { icon: "🎸", name: "Show & Chow", desc: "Review at a tour stop", locked: true },
          ].map(b => (
            <div key={b.name} style={{ width: "calc(50% - 5px)", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)", opacity: b.locked ? 0.4 : 1 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{b.icon}</div>
              <div style={{ fontSize: 11, color: "#ccc", fontWeight: 600 }}>{b.name}</div>
              <div style={{ fontSize: 9, color: "#666" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Socials */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 10, color: "#888", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Follow Rich</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { platform: "Instagram", handle: "@richotoole", url: RICH.instagram, color: "#E4405F" },
            { platform: "TikTok", handle: "@therichotoole", url: RICH.tiktok, color: "#fff", note: "175K followers" },
            { platform: "X / Twitter", handle: "@RichOToole", url: RICH.twitter, color: "#ccc" },
            { platform: "YouTube", handle: "RichOTooleMusic", url: "https://www.youtube.com/@RichOTooleMusic", color: "#FF0000" },
          ].map(s => (
            <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px",
              borderRadius: 8, background: "rgba(255,255,255,0.02)", textDecoration: "none",
            }}>
              <div>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.platform}</div>
                <div style={{ fontSize: 10, color: "#666" }}>{s.handle}</div>
              </div>
              {s.note && <span style={{ fontSize: 9, color: "#555" }}>{s.note}</span>}
            </a>
          ))}
        </div>
      </div>

      <button onClick={onLogout} style={{ ...btnSecondary, color: "#EF4444", borderColor: "rgba(239,68,68,0.2)" }}>Sign Out</button>
    </div>
  );
}

// --- SHARED STYLES -------------------------------------------------------

const btnPrimary = {
  width: "100%", padding: "13px 0", borderRadius: 10, border: "none",
  background: "#E8B100", color: "#000", fontSize: 13, fontWeight: 800,
  cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5,
};

const btnSecondary = {
  width: "100%", padding: "13px 0", borderRadius: 10, background: "transparent",
  border: "1px solid rgba(232,177,0,0.25)", color: "#E8B100", fontSize: 13,
  fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
};

const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 13, fontFamily: "inherit",
  outline: "none", boxSizing: "border-box",
};

const voteBtn = {
  flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer", fontSize: 11,
  fontWeight: 700, fontFamily: "inherit", transition: "all 0.2s",
};

const badgeStyle = (color) => ({
  fontSize: 8, background: `${color}18`, color, padding: "2px 6px",
  borderRadius: 4, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
});

// --- MAIN APP ------------------------------------------------------------

export default function TacoTourApp() {
  const [screen, setScreen] = useState("main"); // splash | auth | main
  const [authMode, setAuthMode] = useState("signup");
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("map");
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);
  const [votes, setVotes] = useState({});
  const [fanRatings, setFanRatings] = useState({});
  const [pollVotes, setPollVotes] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showTourDates, setShowTourDates] = useState(true);
  const [reviewFilter, setReviewFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");

  const handleAuthStart = (mode) => {
    if (mode === "guest") {
      setUser({ name: "Guest", city: "Texas", guest: true });
      setScreen("main");
    } else {
      setAuthMode(mode);
      setScreen("auth");
    }
  };

  const handleAuthComplete = (userData) => {
    setUser(userData);
    setScreen("main");
  };

  const handleVote = (spotId, type) => {
    setVotes(v => ({ ...v, [spotId]: v[spotId] === type ? null : type }));
  };

  const handleFanRate = (spotId, rating) => {
    setFanRatings(prev => ({ ...prev, [spotId]: rating }));
  };

  const handlePollVote = (debateId, optionIdx) => {
    setPollVotes(v => ({ ...v, [debateId]: v[debateId] === optionIdx ? null : optionIdx }));
  };

  const filteredSpots = (() => {
    let spots = reviewFilter === "All" ? TACO_SPOTS
      : reviewFilter === "Trending" ? TACO_SPOTS.filter(s => s.trending)
      : reviewFilter === "Hot Takes" ? TACO_SPOTS.filter(s => Math.abs(s.richRating - s.fanRating) > 0.5)
      : [...TACO_SPOTS].sort((a, b) => b.richRating - a.richRating);
    if (regionFilter !== "All") {
      spots = spots.filter(s => getRegion(s.city) === regionFilter);
    }
    return spots;
  })();

  const tabIcons = {
    map: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    tour: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    music: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    profile: (c) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  };

  const tabs = [
    { id: "map", label: "Tacos" },
    { id: "tour", label: "Tour" },
    { id: "music", label: "Music" },
    { id: "profile", label: user?.guest ? "Join" : "Profile" },
  ];

  // --- RENDER ---
  if (screen === "splash") return (
    <Shell><SplashScreen onGetStarted={handleAuthStart} /></Shell>
  );

  if (screen === "auth") return (
    <Shell><AuthScreen mode={authMode} onComplete={handleAuthComplete} onBack={() => setScreen("splash")} /></Shell>
  );

  return (
    <Shell>
      <style>{`@keyframes eqB { from { height: 3px; } to { height: 14px; } }`}</style>
      <div style={{ position: "relative", zIndex: 1, paddingBottom: 120 }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 9, color: "#E8B100", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Rich O'Toole's</div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: 0, fontFamily: "'Bitter', serif" }}>Taco Tour</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#888" }}>{user?.name || "Guest"}</div>
              <div style={{ fontSize: 9, color: "#555" }}>{TACO_SPOTS.length} spots</div>
            </div>
            <div onClick={() => setTab("profile")} style={{
              width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #E8B100, #D97706)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#000", cursor: "pointer",
            }}>
              {(user?.name || "T")[0].toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "map" && (
            <>
              <MapView spots={TACO_SPOTS} onSelectSpot={setSelectedSpot} selectedSpot={selectedSpot} showTourDates={showTourDates} />
              {/* Tour toggle + hint — single compact row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: -6 }}>
                <span style={{ fontSize: 11, color: "#555" }}>Tap a pin to see Rich's take</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: showTourDates ? "#E8B100" : "#555", fontWeight: 600 }}>🎸 Shows</span>
                  <div
                    onClick={() => setShowTourDates(v => !v)}
                    style={{
                      width: 36, height: 20, borderRadius: 10, cursor: "pointer",
                      background: showTourDates ? "#E8B100" : "rgba(255,255,255,0.1)",
                      position: "relative", transition: "background 0.3s",
                      border: "1px solid " + (showTourDates ? "rgba(232,177,0,0.5)" : "rgba(255,255,255,0.06)"),
                    }}
                  >
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%", background: showTourDates ? "#000" : "#555",
                      position: "absolute", top: 1, left: showTourDates ? 18 : 1,
                      transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }} />
                  </div>
                </div>
              </div>
              {selectedSpot && (
                <div ref={el => {
                  if (el) {
                    setTimeout(() => {
                      const rect = el.getBoundingClientRect();
                      const viewH = window.innerHeight;
                      // Scroll so review top sits at ~55% of viewport height (map still visible above)
                      const targetY = viewH * 0.55;
                      const scrollBy = rect.top - targetY;
                      if (scrollBy > 20) {
                        window.scrollBy({ top: scrollBy, behavior: "smooth" });
                      }
                    }, 150);
                  }
                }}>
                  <ReviewCard spot={selectedSpot} userVote={votes[selectedSpot.id]} onVote={handleVote} onFanRate={handleFanRate} fanRatingSubmitted={fanRatings[selectedSpot.id]} expanded={true} onToggle={() => setSelectedSpot(null)} user={user} />
                </div>
              )}

              {/* Poll */}
              <PollWidget debate={DEBATES[0]} onVote={handlePollVote} userVote={pollVotes[DEBATES[0].id] ?? null} />

              {/* Leaderboard teaser */}
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
                <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>📊 Top Taco Reviewers</div>
                {LEADERBOARD.slice(0, 3).map((u, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14 }}>{u.badge}</span>
                      <div>
                        <div style={{ fontSize: 12, color: "#eee", fontWeight: 600 }}>{u.name}</div>
                        <div style={{ fontSize: 9, color: "#555" }}>{u.city} · 🔥 {u.streak} streak</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: "#E8B100", fontWeight: 700 }}>{u.reviews} reviews</div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                <span style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>All Reviews</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>

              {/* Type Filters */}
              <div style={{ display: "flex", gap: 6 }}>
                {["All", "Trending", "Hot Takes", "Top Rated"].map(f => (
                  <button key={f} onClick={() => setReviewFilter(f)} style={{
                    padding: "6px 12px", borderRadius: 20, border: "none",
                    background: reviewFilter === f ? "rgba(232,177,0,0.15)" : "rgba(255,255,255,0.04)",
                    color: reviewFilter === f ? "#E8B100" : "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  }}>{f}</button>
                ))}
              </div>
              {/* Region Filters - scroll to section on tap */}
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["All", ...ALL_REGIONS].map(r => {
                  const count = r === "All" ? TACO_SPOTS.length : TACO_SPOTS.filter(s => getRegion(s.city) === r).length;
                  return (
                    <button key={r} onClick={() => {
                      setRegionFilter(r);
                      if (r !== "All") {
                        setTimeout(() => {
                          const el = document.getElementById("region-" + r.replace(/\s/g, "-"));
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 50);
                      }
                    }} style={{
                      padding: "6px 12px", borderRadius: 8, border: regionFilter === r ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.12)",
                      background: regionFilter === r ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                      color: regionFilter === r ? "#22C55E" : "#ccc", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      {r === "All" ? "📍 All Regions" : r}
                      <span style={{ fontSize: 9, color: regionFilter === r ? "#4ADE80" : "#888", fontWeight: 700 }}>{count}</span>
                    </button>
                  );
                })}
              </div>
              {/* Grouped reviews by region */}
              {(() => {
                const grouped = {};
                filteredSpots.forEach(s => {
                  const r = getRegion(s.city);
                  if (!grouped[r]) grouped[r] = [];
                  grouped[r].push(s);
                });
                const regionOrder = Object.keys(grouped).sort();
                return regionOrder.map(region => (
                  <div key={region} id={"region-" + region.replace(/\s/g, "-")}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "10px 0 4px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 6,
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#22C55E", fontFamily: "'Bitter', serif" }}>{region}</span>
                      <span style={{ fontSize: 9, color: "#555", fontWeight: 600 }}>{grouped[region].length} spot{grouped[region].length !== 1 ? "s" : ""}</span>
                      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
                      <span style={{ fontSize: 9, color: "#666" }}>Avg {(grouped[region].reduce((a, s) => a + s.richRating, 0) / grouped[region].length).toFixed(1)}</span>
                    </div>
                    {grouped[region].map(spot => (
                      <ReviewCard key={spot.id} spot={spot} userVote={votes[spot.id]} onVote={handleVote} onFanRate={handleFanRate} fanRatingSubmitted={fanRatings[spot.id]}
                        expanded={expandedReview === spot.id} onToggle={() => setExpandedReview(expandedReview === spot.id ? null : spot.id)} user={user} />
                    ))}
                  </div>
                ));
              })()}
              {/* Submit CTA */}
              {showReviewForm ? (
                <FanReviewForm user={user} onClose={() => setShowReviewForm(false)} />
              ) : (
                <div style={{ background: "rgba(232,177,0,0.04)", border: "1px solid rgba(232,177,0,0.12)", borderRadius: 14, padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>🌮</div>
                  <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "'Bitter', serif", marginBottom: 4 }}>Got a Taco Take?</div>
                  <div style={{ fontSize: 11, color: "#888", marginBottom: 12 }}>Rate a spot. Climb the leaderboard. Prove Rich wrong.</div>
                  <button onClick={() => setShowReviewForm(true)} style={{ ...btnPrimary, width: "auto", padding: "10px 28px", display: "inline-block" }}>SUBMIT A REVIEW</button>
                </div>
              )}
            </>
          )}

          {tab === "tour" && <TourSection />}

          {tab === "music" && <MusicSection />}

          {tab === "profile" && (
            user?.guest ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🌮</div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Bitter', serif", margin: "0 0 8px" }}>Join the Tour</h2>
                <p style={{ fontSize: 12, color: "#888", margin: "0 0 24px" }}>Create an account to submit reviews, vote on debates, and earn badges.</p>
                <button onClick={() => { setScreen("auth"); setAuthMode("signup"); }} style={btnPrimary}>Create Account</button>
              </div>
            ) : (
              <ProfileSection user={user} onLogout={() => { setUser(null); setScreen("splash"); }} />
            )
          )}

        </div>
      </div>

      {/* Bottom nav */}
      <div className="shell-nav" style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%",
        background: "linear-gradient(180deg, rgba(20,20,30,0.92) 0%, rgba(10,10,16,0.99) 50%)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(232,177,0,0.15)",
        display: "flex", justifyContent: "space-around", padding: "8px 0 env(safe-area-inset-bottom, 12px)", zIndex: 100,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.5), 0 -1px 0 rgba(232,177,0,0.06)",
      }}>
        {tabs.map(t => {
          const active = tab === t.id;
          const iconColor = active ? "#E8B100" : "#888";
          return (
            <button key={t.id} onClick={() => { setTab(t.id); setShowReviewForm(false); setShowShareCard(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 14px", position: "relative" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? "rgba(232,177,0,0.18)" : "transparent",
                border: active ? "2px solid rgba(232,177,0,0.7)" : "2px solid transparent",
                boxShadow: active ? "0 0 18px rgba(232,177,0,0.35), inset 0 0 10px rgba(232,177,0,0.1)" : "none",
                transition: "all 0.3s ease",
              }}>
                {tabIcons[t.id](iconColor)}
              </div>
              <span style={{ fontSize: 9, color: active ? "#E8B100" : "#666", fontWeight: active ? 700 : 500, letterSpacing: active ? 0.5 : 0, transition: "all 0.3s" }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </Shell>
  );
}

// --- SHELL ---------------------------------------------------------------

function Shell({ children }) {
  return (
    <>
      <style>{`
        html, body { background: #08080c; }
        .shell-frame { max-width: 430px; }
        .shell-nav { max-width: 430px; }
        @media (min-width: 768px) {
          .shell-frame { max-width: 720px !important; }
          .shell-nav { max-width: 720px !important; }
          .map-container { height: 500px !important; }
        }
        @media (min-width: 1024px) {
          .shell-frame {
            max-width: 860px !important;
            border-left: 1px solid rgba(255,255,255,0.06) !important;
            border-right: 1px solid rgba(255,255,255,0.06) !important;
            box-shadow: 0 0 80px rgba(232,177,0,0.04), 0 0 40px rgba(0,0,0,0.5) !important;
          }
          .shell-nav { max-width: 860px !important; }
          .map-container { height: 550px !important; }
        }
      `}</style>
      <div className="shell-frame" style={{
        maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#0d0d14",
        fontFamily: "'DM Sans', -apple-system, sans-serif", position: "relative", overflow: "hidden",
      }}>
        {/* Ambient */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,177,0,0.05) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.03) 0%, transparent 70%)" }} />
        </div>
        {children}
      </div>
    </>
  );
}
