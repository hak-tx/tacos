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
const BANDSINTOWN_ARTIST = "https://www.bandsintown.com/a/39860-rich-o'toole";
const TOUR_DATES = [
  { date: "Mar 7", day: "Sat", venue: "Round Mountain Cider Mill", city: "Round Mountain, TX", lat: 30.434, lng: -98.383, tacoHunt: "Scouting spots...", soldOut: false, free: true, rsvp: 243 },
  { date: "Mar 14", day: "Sat", venue: "Old Tomball Honky Tonk", city: "Tomball, TX", lat: 30.097, lng: -95.616, tacoHunt: "Scouting spots...", soldOut: false, free: false, rsvp: 187 },
  { date: "Mar 20", day: "Fri", venue: "Junk Gypsy Company", city: "Round Top, TX", lat: 30.060, lng: -96.680, tacoHunt: "Scouting spots...", soldOut: false, free: true, rsvp: 112 },
  { date: "Mar 21", day: "Sat", venue: "Junk Gypsy Company", city: "Round Top, TX", lat: 30.060, lng: -96.680, tacoHunt: "Scouting spots...", soldOut: false, free: true, rsvp: 98 },
  { date: "Mar 27", day: "Fri", venue: "Lone Star Live", city: "Flower Mound, TX", lat: 33.014, lng: -97.097, tacoHunt: "Where should Rich eat? Vote!", soldOut: false, free: false, rsvp: 76 },
  { date: "Apr 2", day: "Thu", venue: "Private Event", city: "Austin, TX", lat: 30.267, lng: -97.743, tacoHunt: "Invite only", soldOut: true, free: true, rsvp: null },
  { date: "Apr 17", day: "Fri", venue: "LBK Fest 2026", city: "Lubbock, TX", lat: 33.577, lng: -101.855, tacoHunt: "Festival taco hunt!", soldOut: false, free: false, rsvp: 340 },
  { date: "Apr 18", day: "Sat", venue: "The Lumberyard", city: "Canyon, TX", lat: 34.980, lng: -101.919, tacoHunt: "Scouting spots...", soldOut: false, free: true, rsvp: 55 },
  { date: "Apr 23", day: "Thu", venue: "The Hall - Gainesville", city: "Gainesville, GA", lat: 34.297, lng: -83.824, tacoHunt: "Georgia taco hunt!", soldOut: false, free: false, rsvp: 63 },
  { date: "Apr 30", day: "Thu", venue: "Chief's on Broadway", city: "Nashville, TN", lat: 36.156, lng: -86.776, tacoHunt: "Nashville taco hunt!", soldOut: false, free: true, rsvp: 201 },
  { date: "May 21", day: "Thu", venue: "Kerrville Folk Festival 2026", city: "Kerrville, TX", lat: 30.047, lng: -99.140, tacoHunt: "Festival taco hunt!", soldOut: false, free: false, rsvp: 158 },
  { date: "May 30", day: "Sat", venue: "Boyz R Back Music Festival 2026", city: "Midland, TX", lat: 31.997, lng: -102.077, tacoHunt: "Festival taco hunt!", soldOut: false, free: false, rsvp: 220 },
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
function SplashScreen({ onGetStarted, onClose }) {
  const [step, setStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => { setTimeout(() => setFadeIn(true), 100); }, []);

  const slides = [
    {
      emoji: "🌮🎸",
      title: "Tacos Setlist",
      subtitle: "Texas Country meets\nthe best tacos on the road",
      detail: "Rich O'Toole reviews taco spots on tour.\nRate them yourself, submit your own,\nand see what fans think!",
      bg: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=70",
    },
    {
      emoji: "🗺️🗳️",
      title: "Map, Rate, Recommend",
      subtitle: "Explore reviews and help Rich\nfind the best spots",
      detail: "Browse the interactive taco map,\nagree or disagree with Rich's ratings,\nand recommend restaurants near his next show.",
      bg: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=70",
    },
    {
      emoji: "🎶🎟️",
      title: "Tour Dates, Tickets, Music",
      subtitle: "Shows, Spotify, and\neverything Rich O'Toole",
      detail: "See upcoming shows with tickets,\nstream Rich's latest album and full catalog\non Spotify, and shop official merch.",
      bg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=70",
    },
  ];

  const s = slides[step];
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 260, background: "#0d0d14", touchAction: "none" }}
      onTouchMove={e => e.stopPropagation()}>
      {/* Background image — subtle */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.bg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,13,20,0.3) 0%, rgba(13,13,20,0.85) 60%, rgba(13,13,20,1) 85%)" }} />

      {/* Close button */}
      {onClose && (
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "#aaa", fontSize: 16, width: 36, height: 36, borderRadius: "50%", cursor: "pointer", zIndex: 10 }}>✕</button>
      )}

      {/* Everything centered in one flex container */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 32px", textAlign: "center", zIndex: 5, opacity: fadeIn ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{s.emoji}</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", fontFamily: "'Bitter', serif", margin: "0 0 12px", lineHeight: 1.2 }}>{s.title}</h1>
        <p style={{ fontSize: 18, color: "#E8B100", fontWeight: 600, margin: "0 0 12px", maxWidth: 300, lineHeight: 1.4, whiteSpace: "pre-line" }}>{s.subtitle}</p>
        <p style={{ fontSize: 16, color: "#aaa", margin: "0 0 28px", maxWidth: 300, lineHeight: 1.6, whiteSpace: "pre-line" }}>{s.detail}</p>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setStep(i)} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4, background: i === step ? "#E8B100" : "rgba(255,255,255,0.2)", transition: "all 0.3s", cursor: "pointer" }} />
          ))}
        </div>

        {/* Button */}
        {step < slides.length - 1 ? (
          <button onClick={() => setStep(step + 1)} style={{ ...btnPrimary, width: 220 }}>Next</button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 220 }}>
            <button onClick={() => onGetStarted("signup")} style={btnPrimary}>Get Started</button>
            <button onClick={() => onGetStarted("login")} style={btnSecondary}>I have an account</button>
            <button onClick={() => onGetStarted("guest")} style={{ border: "none", background: "none", color: "#666", fontSize: 12, cursor: "pointer", padding: 6, fontFamily: "inherit" }}>Browse as guest</button>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. AUTH SCREEN (Login / Signup)
function AuthScreen({ mode, onComplete, onBack }) {
  const [authMode, setAuthMode] = useState(mode);
  const [form, setForm] = useState({ name: "", email: "", password: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    if (!email || !password) { setError("Email and password are required"); return; }
    if (authMode === "signup" && password.length < 6) { setError("Password must be at least 6 characters"); return; }

    setLoading(true);
    setTimeout(() => {
      try {
        const usersRaw = localStorage.getItem("tt-users");
        const users = usersRaw ? JSON.parse(usersRaw) : {};

        if (authMode === "signup") {
          if (users[email]) { setError("Account already exists. Sign in instead."); setLoading(false); return; }
          // Hash password (simple for prototype — production would use bcrypt on server)
          const passHash = btoa(password + ":tunes-tacos-salt");
          const newUser = {
            id: "user_" + Date.now(),
            name: form.name.trim() || "Taco Fan",
            email,
            passHash,
            city: form.city.trim() || "Texas",
            role: "user", // "user" | "admin"
            joinedAt: new Date().toISOString(),
            reviewCount: 0,
            agreeCount: 0,
            xp: 0,
          };
          users[email] = newUser;
          localStorage.setItem("tt-users", JSON.stringify(users));
          localStorage.setItem("tt-session", JSON.stringify(newUser));
          onComplete(newUser);
        } else {
          // Login
          const existing = users[email];
          if (!existing) { setError("No account found with that email"); setLoading(false); return; }
          const passHash = btoa(password + ":tunes-tacos-salt");
          if (existing.passHash !== passHash) { setError("Incorrect password"); setLoading(false); return; }
          localStorage.setItem("tt-session", JSON.stringify(existing));
          onComplete(existing);
        }
      } catch (e) {
        setError("Something went wrong. Try again.");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "60px 24px 24px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#666", fontSize: 12, cursor: "pointer", marginBottom: 24, fontFamily: "inherit" }}>← Back</button>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: "'Bitter', serif", margin: "0 0 4px" }}>
        {authMode === "signup" ? "Join Tacos Setlist" : "Welcome Back"}
      </h1>
      <p style={{ fontSize: 12, color: "#888", margin: "0 0 28px" }}>
        {authMode === "signup" ? "Create your account to rate tacos, make recommendations, and debate Rich" : "Sign in to your account"}
      </p>

      {error && (
        <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", fontSize: 12, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* Form fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {authMode === "signup" && (
          <input placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle} />
        )}
        <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ ...inputStyle, fontSize: 16 }} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          style={{ ...inputStyle, fontSize: 16 }} />
        {authMode === "signup" && (
          <input placeholder="Home city (for local taco recs)" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}
            style={inputStyle} />
        )}
        <button onClick={handleSubmit} disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.6 : 1 }}>
          {loading ? "Loading..." : authMode === "signup" ? "Create Account" : "Sign In"}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={() => { setAuthMode(authMode === "signup" ? "login" : "signup"); setError(""); }}
          style={{ background: "none", border: "none", color: "#E8B100", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
          {authMode === "signup" ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 32, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>PROTOTYPE MODE</div>
        <div style={{ fontSize: 10, color: "#444" }}>Accounts are stored locally on this device for testing</div>
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
  const tacoAnnsRef = useRef([]);
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

        // Tour date pins — added FIRST so taco spots render ON TOP of them
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
            el.style.cssText = "display:flex;flex-direction:column;align-items:center;cursor:pointer;position:relative;";
            const pin = document.createElement("div");
            pin.style.cssText = "width:24px;height:24px;border-radius:50%;background:rgba(196,30,58,0.75);display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.7);box-shadow:0 1px 4px rgba(0,0,0,0.4);transition:transform 0.3s,background 0.3s;cursor:pointer;";
            pin.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>';
            el.appendChild(pin);
            const label = document.createElement("div");
            label.style.cssText = "background:rgba(0,0,0,0.6);color:rgba(255,255,255,0.8);font-size:8px;font-weight:700;padding:1px 4px;border-radius:3px;margin-top:2px;white-space:nowrap;font-family:system-ui;letter-spacing:0.3px;";
            label.textContent = td.date;
            el.appendChild(label);
            const bubble = document.createElement("div");
            bubble.style.cssText = "display:none;position:absolute;bottom:48px;left:50%;transform:translateX(-50%);background:rgba(13,13,20,0.97);border:1px solid rgba(196,30,58,0.4);border-radius:12px;padding:10px 14px;white-space:nowrap;box-shadow:0 4px 24px rgba(0,0,0,0.7);z-index:50;min-width:160px;text-align:center;";
            bubble.innerHTML = "<div style='font-size:13px;font-weight:800;color:#fff;font-family:system-ui;'>" + td.venue + "</div>" +
              "<div style='font-size:11px;color:#ccc;margin-top:3px;'>" + td.city + "</div>" +
              "<div style='font-size:10px;color:#C41E3A;margin-top:4px;font-weight:700;'>♪ " + td.day + " " + td.date + "</div>" +
              (td.rsvp ? "<div style='font-size:11px;color:#555;margin-top:2px;'>" + td.rsvp + " fans going</div>" : "") +
              "<a href='https://www.bandsintown.com/a/39860-rich-otoole' target='_blank' rel='noopener' style='display:inline-block;margin-top:8px;padding:6px 14px;background:#E8B100;color:#000;font-size:11px;font-weight:800;border-radius:6px;text-decoration:none;font-family:system-ui;'>Get Tickets →</a>";
            const arrow = document.createElement("div");
            arrow.style.cssText = "position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid rgba(13,13,20,0.97);";
            bubble.appendChild(arrow);
            el.appendChild(bubble);
            el._bubble = bubble;
            el._pin = pin;
            el._label = label;
            tourEls.push(el);
            return el;
          }, { anchorOffset: new DOMPoint(0, -12) });
          ann.addEventListener("select", (e) => {
            const el = e.target.element;
            if (el && el._bubble) { el._bubble.style.display = "block"; el._pin.style.transform = "scale(1.4)"; el._pin.style.background = "#C41E3A"; }
          });
          ann.addEventListener("deselect", (e) => {
            const el = e.target.element;
            if (el && el._bubble) { el._bubble.style.display = "none"; el._pin.style.transform = "scale(1)"; el._pin.style.background = "rgba(196,30,58,0.75)"; }
          });
          map.addAnnotation(ann);
          tourAnns.push(ann);
        });
        tourAnnsRef.current = tourAnns;

        // Taco spot pins — added SECOND so they render ON TOP of tour pins
        const tacoAnns = [];
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
          tacoAnns.push(ann);
        });
        tacoAnnsRef.current = tacoAnns;

        // Listen for zoom changes to scale tour pins
        map.addEventListener("region-change-end", () => {
          const span = map.region.span;
          const zoomed = span.latitudeDelta < 3;
          const veryZoomed = span.latitudeDelta < 1.5;
          tourEls.forEach(el => {
            if (veryZoomed) {
              el._pin.style.width = "30px"; el._pin.style.height = "30px";
              el._label.style.fontSize = "10px";
            } else if (zoomed) {
              el._pin.style.width = "27px"; el._pin.style.height = "27px";
              el._label.style.fontSize = "9px";
            } else {
              el._pin.style.width = "24px"; el._pin.style.height = "24px";
              el._label.style.fontSize = "8px";
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
    if (showTourDates) {
      // Add tour pins first, then re-add taco pins on top
      tourAnnsRef.current.forEach(ann => {
        if (!map.annotations.includes(ann)) map.addAnnotation(ann);
      });
      // Re-add taco spots so they render on top
      tacoAnnsRef.current.forEach(ann => {
        map.removeAnnotation(ann);
        map.addAnnotation(ann);
      });
    } else {
      tourAnnsRef.current.forEach(ann => {
        map.removeAnnotation(ann);
      });
    }
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
              {selectedSpot.tags && <div style={{ display: "flex", gap: 4, marginTop: 4 }}>{selectedSpot.tags.map(t => <span key={t} style={{ fontSize: 11, color: "#aaa", background: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: 4 }}>{t}</span>)}</div>}
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
          {selectedSpot.trending && <div style={{ fontSize: 11, color: "#E8B100", marginTop: 6 }}>🔥 TRENDING</div>}
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
        await new Promise(r => setTimeout(r, 100));
        if (cancelled || !cardRef.current) return;
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: "#0d0d14", scale: 2, useCORS: true, logging: false, windowWidth: 400,
        });
        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        if (blob && !cancelled) {
          cachedFile.current = new File([blob], "tacos-setlist-review.png", { type: "image/png", lastModified: Date.now() });
          setReady(true);
        }
      } catch (e) {
        setReady(true);
      }
    };
    generate();
    return () => { cancelled = true; };
  }, [spot.id]);

  const handleShare = useCallback(async () => {
    const shareText = `🌮 ${spot.name} — @RichOToole gave it a ${spot.richRating}! "${spot.richQuote}"`;
    const shareUrl = "https://tacos-lime.vercel.app/spot/" + spot.id;
    const shareData = { title: spot.name, text: shareText, url: shareUrl };

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
      {/* Hidden branded share card for html2canvas */}
      <div style={{ position: "fixed", left: 0, top: 0, opacity: 0, pointerEvents: "none", zIndex: -1 }}>
        <div ref={cardRef} style={{ width: 400, fontFamily: "system-ui, -apple-system, sans-serif", background: "#0d0d14" }}>
          <div style={{ height: 4, background: "linear-gradient(90deg, #E8B100, #D97706, #E8B100)" }} />
          <div style={{ padding: "24px 28px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: 22 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #E8B100, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, color: "#000" }}>R</div>
              <div>
                <div style={{ fontSize: 15, color: "#fff", fontWeight: 700 }}>Rich O'Toole</div>
                <div style={{ fontSize: 11, color: "#E8B100", fontWeight: 600 }}>Tacos Setlist</div>
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
      <div style={{ textAlign: "center", marginTop: 4, fontSize: 11, color: "#555" }}>
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

  const handleDisagree = () => { onVote(spot.id, "disagree"); setShowSlider(true); setSliderVal(spot.fanRating); };
  const handleAgree = () => { onVote(spot.id, "agree"); setShowSlider(false); };

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
            <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "'Bitter', serif" }}>{spot.name}</span>
            {spot.trending && <span style={badgeStyle("#E8B100")}>TRENDING</span>}
            {hotTake && <span style={badgeStyle("#EF4444")}>HOT TAKE</span>}
          </div>
          <div style={{ fontSize: 13, color: "#888", marginTop: 3 }}>{spot.city} · {spot.reviewDate}</div>
          <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
            {spot.tags.map(t => <span key={t} style={{ fontSize: 11, color: "#aaa", background: "rgba(255,255,255,0.04)", padding: "3px 10px", borderRadius: 20 }}>{t}</span>)}
          </div>
        </div>
        <div style={{ textAlign: "center", minWidth: 54 }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: ratingColor(spot.richRating), fontFamily: "'Bitter', serif", lineHeight: 1 }}>{spot.richRating}</div>
          <div style={{ fontSize: 10, color: ratingColor(spot.richRating), textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, marginTop: 2 }}>{ratingLabel(spot.richRating)}</div>
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }} onClick={e => e.stopPropagation()}>
          {/* Rich's quote — prominent, highlighted */}
          <div style={{ background: "linear-gradient(135deg, rgba(232,177,0,0.08), rgba(232,177,0,0.02))", borderRadius: 12, padding: "16px 16px 14px", marginBottom: 16, borderLeft: "3px solid #E8B100" }}>
            <div style={{ fontSize: 16, color: "#eee", fontStyle: "italic", lineHeight: 1.6, fontWeight: 500 }}>"{spot.richQuote}"</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #E8B100, #D97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#000" }}>R</div>
              <span style={{ fontSize: 13, color: "#E8B100", fontWeight: 700 }}>Rich O'Toole</span>
            </div>
          </div>

          {/* Photo Gallery */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
              {(spot.images || [0, 1, 2]).map((img, i) => (
                <div key={i} style={{
                  flex: i === 0 ? "0 0 65%" : "0 0 30%", height: i === 0 ? 160 : 76,
                  borderRadius: 10, position: "relative", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.04)", background: "#111",
                }}>
                  {typeof img === "string" ? (
                    <img src={img} alt={`${spot.name} photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(${120 + i * 40}deg, rgba(232,177,0,0.08), rgba(50,30,10,0.4))` }}>
                      <span style={{ fontSize: i === 0 ? 48 : 28, opacity: 0.6 }}>🌮</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Score comparison — visual, clear, labeled */}
          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: "#E8B100", fontWeight: 700, marginBottom: 2 }}>Rich's Score</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: ratingColor(spot.richRating), fontFamily: "'Bitter', serif", lineHeight: 1 }}>{spot.richRating}</div>
              </div>
              <div style={{ fontSize: 14, color: "#444", marginBottom: 4 }}>vs</div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#60A5FA", fontWeight: 700, marginBottom: 2 }}>Fan Average</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#60A5FA", fontFamily: "'Bitter', serif", lineHeight: 1 }}>{spot.fanRating}</div>
              </div>
            </div>
            {/* Visual bars */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#E8B100", fontWeight: 600, minWidth: 36 }}>Rich</span>
                <div style={{ flex: 1, height: 12, background: "rgba(255,255,255,0.04)", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ width: `${(spot.richRating / 10) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${ratingColor(spot.richRating)}, ${ratingColor(spot.richRating)}aa)`, borderRadius: 6, transition: "width 0.6s" }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#60A5FA", fontWeight: 600, minWidth: 36 }}>Fans</span>
                <div style={{ flex: 1, height: 12, background: "rgba(255,255,255,0.04)", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ width: `${(spot.fanRating / 10) * 100}%`, height: "100%", background: "linear-gradient(90deg, #60A5FA, #60A5FAaa)", borderRadius: 6, transition: "width 0.6s" }} />
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#666", textAlign: "right" }}>{spot.fanVotes.toLocaleString()} fan votes</div>
          </div>

          {/* Vote buttons — BOLD, inviting */}
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <button onClick={handleAgree} style={{
              flex: 1, padding: "14px 0", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
              fontSize: 15, fontWeight: 700, transition: "all 0.2s",
              background: userVote === "agree" ? "rgba(74,222,128,0.2)" : "rgba(74,222,128,0.06)",
              color: userVote === "agree" ? "#4ADE80" : "#4ADE80",
              border: userVote === "agree" ? "2px solid #4ADE80" : "2px solid rgba(74,222,128,0.2)",
            }}>🤝 {userVote === "agree" ? "Agreed!" : "Agree with Rich"}</button>
            <button onClick={handleDisagree} style={{
              flex: 1, padding: "14px 0", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
              fontSize: 15, fontWeight: 700, transition: "all 0.2s",
              background: userVote === "disagree" ? "rgba(239,68,68,0.2)" : "rgba(239,68,68,0.06)",
              color: userVote === "disagree" ? "#EF4444" : "#EF4444",
              border: userVote === "disagree" ? "2px solid #EF4444" : "2px solid rgba(239,68,68,0.2)",
            }}>🌶️ {userVote === "disagree" ? "Disagreed!" : "Wrong, Rich!"}</button>
          </div>

          {/* Agree confirmation */}
          {userVote === "agree" && (
            <div style={{
              background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: 10, padding: 12, marginBottom: 10,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 13, color: "#4ADE80", fontWeight: 700 }}>✓ You agreed with Rich's {spot.richRating}</span>
              <span style={{ fontSize: 12, color: "#4ADE80" }}>{(spot.fanVotes + 1).toLocaleString()} fans</span>
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
                <span style={{ fontSize: 11, color: "#EF4444" }}>1</span>
                <span style={{ fontSize: 11, color: "#F97316" }}>3</span>
                <span style={{ fontSize: 11, color: "#E8B100" }}>5</span>
                <span style={{ fontSize: 11, color: "#E8B100" }}>7</span>
                <span style={{ fontSize: 11, color: "#22C55E" }}>9</span>
                <span style={{ fontSize: 11, color: "#22C55E" }}>10</span>
              </div>

              {/* Rich vs You comparison */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#E8B100", fontWeight: 600, marginBottom: 2 }}>Rich</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: ratingColor(spot.richRating), fontFamily: "'Bitter', serif" }}>{spot.richRating}</div>
                </div>
                <span style={{ fontSize: 11, color: "#444" }}>vs</span>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "#60A5FA", fontWeight: 600, marginBottom: 2 }}>You</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: ratingColor(sliderVal), fontFamily: "'Bitter', serif" }}>{sliderVal.toFixed(1)}</div>
                </div>
                {Math.abs(spot.richRating - sliderVal) > 2 && (
                  <span style={{ fontSize: 11, color: "#EF4444", fontWeight: 700, background: "rgba(239,68,68,0.1)", padding: "2px 6px", borderRadius: 4 }}>🌶️ HOT TAKE</span>
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
                <div style={{ fontSize: 11, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Nearby Show</div>
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
    <div style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(232,177,0,0.06))", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 16, padding: "18px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ fontSize: 11, color: "#EF4444", fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>🗳️ Fan Poll</div>
      <div style={{ fontSize: 16, color: "#fff", fontWeight: 800, fontFamily: "'Bitter', serif", marginBottom: 14, lineHeight: 1.3 }}>{debate.question}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {debate.options.map((opt, i) => {
          const isSelected = userVote === i;
          const hasVoted = userVote !== null;
          return (
            <button key={i} onClick={() => onVote(debate.id, i)} style={{
              width: "100%", padding: "14px 16px", borderRadius: 10, cursor: hasVoted ? "default" : "pointer",
              position: "relative", overflow: "hidden", textAlign: "left", fontFamily: "inherit",
              border: isSelected ? "2px solid #E8B100" : "2px solid rgba(255,255,255,0.08)",
              background: isSelected ? "rgba(232,177,0,0.1)" : "rgba(255,255,255,0.04)",
              transition: "all 0.2s",
            }}>
              {hasVoted && (
                <div style={{ position: "absolute", inset: "0 auto 0 0", width: `${opt.pct}%`, background: isSelected ? "rgba(232,177,0,0.15)" : "rgba(255,255,255,0.04)", transition: "width 0.8s ease-out", borderRadius: 8 }} />
              )}
              <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 15, color: isSelected ? "#E8B100" : "#ddd", fontWeight: isSelected ? 800 : 500 }}>
                  {isSelected && "✓ "}{opt.label}
                </span>
                {hasVoted && <span style={{ fontSize: 15, color: isSelected ? "#E8B100" : "#888", fontWeight: 800 }}>{opt.pct}%</span>}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: "#555", marginTop: 10, textAlign: "center" }}>
        {userVote !== null ? `You voted · ${debate.totalVotes.toLocaleString()} total votes` : `${debate.totalVotes.toLocaleString()} fans have voted — tap to weigh in!`}
      </div>
    </div>
  );
}

// 8. TOUR DATES - Recommendation Ranking Modal
function RecommendModal({ tourDate, tourIndex, onClose }) {
  const [rankings, setRankings] = useState([]);
  const [voted, setVoted] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchTimeout = useRef(null);

  // Load rankings from server
  const fetchRankings = async () => {
    try {
      const res = await fetch("/api/recs?stop=" + tourIndex);
      const data = await res.json();
      if (Array.isArray(data)) setRankings(data);
    } catch (e) {
      // Fallback to localStorage if API fails
      try {
        const saved = localStorage.getItem("taco-recs-" + tourIndex);
        if (saved) setRankings(JSON.parse(saved));
      } catch (e2) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRankings();
    if (window.mapkit) {
      try { mapkit.init({ authorizationCallback: (done) => done(MAPKIT_TOKEN) }); } catch (e) {}
    }
  }, []);

  const handleUpvote = async (rec) => {
    if (voted[rec.name]) return;
    setVoted(prev => ({ ...prev, [rec.name]: true }));
    // Optimistic update
    setRankings(prev => prev.map(r => r.name === rec.name ? { ...r, votes: r.votes + 1 } : r).sort((a, b) => b.votes - a.votes));
    try {
      await fetch("/api/recs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stop: tourIndex, action: "upvote", recId: rec.id }),
      });
    } catch (e) {}
  };

  const handleRemove = async (rec) => {
    setRankings(prev => prev.filter(r => r.id !== rec.id));
    try {
      await fetch("/api/recs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stop: tourIndex, action: "remove", recId: rec.id }),
      });
    } catch (e) {}
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (!query.trim() || query.trim().length < 2 || !window.mapkit) { setSearchResults([]); setSearching(false); return; }
    setSearching(true);
    searchTimeout.current = setTimeout(() => {
      try { mapkit.init({ authorizationCallback: (done) => done(MAPKIT_TOKEN) }); } catch(e) {}
      const s = new mapkit.Search({
        region: new mapkit.CoordinateRegion(new mapkit.Coordinate(tourDate.lat, tourDate.lng), new mapkit.CoordinateSpan(0.5, 0.5)),
      });
      s.autocomplete(query, (err, data) => {
        setSearching(false);
        if (err || !data || !data.results) { setSearchResults([]); return; }
        setSearchResults(data.results
          .filter(r => r.coordinate)
          .slice(0, 8)
          .map(r => ({
            name: r.displayLines[0] || "",
            address: r.displayLines[1] || "",
            dist: Math.round(Math.sqrt(Math.pow(r.coordinate.latitude - tourDate.lat, 2) + Math.pow(r.coordinate.longitude - tourDate.lng, 2)) * 69 * 10) / 10,
          }))
        );
      });
    }, 300);
  };

  const handleSelect = async (place) => {
    // Optimistic update
    const existing = rankings.find(r => r.name.toLowerCase() === place.name.toLowerCase());
    if (existing) {
      handleUpvote(existing);
    } else {
      setRankings(prev => [...prev, { id: "temp-" + Date.now(), name: place.name, address: place.address, votes: 1 }].sort((a, b) => b.votes - a.votes));
      setVoted(prev => ({ ...prev, [place.name]: true }));
      try {
        await fetch("/api/recs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stop: tourIndex, name: place.name, address: place.address, action: "add" }),
        });
        // Refresh from server to get real ID
        fetchRankings();
      } catch (e) {}
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 430, height: "70vh", background: "#141420", borderRadius: "20px 20px 0 0", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 10px", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "'Bitter', serif" }}>🌮 Fan Picks</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>Near <span style={{ color: "#E8B100" }}>{tourDate.city.split(",")[0]}</span> · {tourDate.venue}</div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#888", fontSize: 18, width: 32, height: 32, borderRadius: "50%", cursor: "pointer" }}>✕</button>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: "0 20px 10px", flexShrink: 0 }}>
          <input
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search any restaurant or place..."
            style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(232,177,0,0.2)", borderRadius: 10, color: "#fff", fontSize: 16, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflow: "auto", padding: "0 20px 20px" }}>
          {/* Search results */}
          {searchQuery.length >= 2 && (
            <>
              {searching && <div style={{ padding: 12, color: "#888", fontSize: 12, textAlign: "center" }}>Searching...</div>}
              {!searching && searchResults.length === 0 && searchQuery.length >= 2 && (
                <div style={{ padding: 12, color: "#555", fontSize: 12, textAlign: "center" }}>No results found</div>
              )}
              {searchResults.map((p, j) => (
                <button key={j} onClick={() => handleSelect(p)}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 4px", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                  <span style={{ fontSize: 16 }}>📍</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: "#666", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.address}</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 600 }}>{p.dist} mi</div>
                </button>
              ))}
            </>
          )}

          {/* Rankings */}
          {searchQuery.length < 2 && rankings.length > 0 && (
            <>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, padding: "8px 0 4px" }}>Fan Rankings</div>
              {rankings.map((r, j) => (
                <div key={r.id || r.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ minWidth: 24, textAlign: "center", fontSize: j < 3 ? 14 : 12, color: j === 0 ? "#E8B100" : j === 1 ? "#C0C0C0" : j === 2 ? "#CD7F32" : "#444", fontWeight: 900 }}>
                    {j === 0 ? "🥇" : j === 1 ? "🥈" : j === 2 ? "🥉" : (j + 1)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{r.name}</div>
                    {r.address && <div style={{ fontSize: 11, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.address}</div>}
                  </div>
                  <button onClick={() => handleUpvote(r)} disabled={voted[r.name]}
                    style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", borderRadius: 6, border: voted[r.name] ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.1)", background: voted[r.name] ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)", color: voted[r.name] ? "#22C55E" : "#fff", fontSize: 13, fontWeight: 700, fontFamily: "inherit", cursor: voted[r.name] ? "default" : "pointer", flexShrink: 0 }}>
                    {voted[r.name] ? "✓" : "👍"} {r.votes}
                  </button>
                  <button onClick={() => handleRemove(r)}
                    style={{ background: "none", border: "none", color: "#444", fontSize: 14, cursor: "pointer", padding: "4px", flexShrink: 0 }}>✕</button>
                </div>
              ))}
            </>
          )}

          {/* Empty state */}
          {searchQuery.length < 2 && rankings.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🌮</div>
              <div style={{ fontSize: 13, color: "#888" }}>No picks yet</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Search above to recommend a spot</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TourSection() {
  const [recModal, setRecModal] = useState(null); // tour date index
  const [recCounts, setRecCounts] = useState({}); // { index: count }

  // Load recommendation counts from API
  useEffect(() => {
    async function loadCounts() {
      const counts = {};
      for (let i = 0; i < TOUR_DATES.length; i++) {
        try {
          const res = await fetch("/api/recs?stop=" + i);
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) counts[i] = data.length;
        } catch (e) {
          // Fallback to localStorage
          try {
            const saved = localStorage.getItem("taco-recs-" + i);
            if (saved) counts[i] = JSON.parse(saved).length;
          } catch (e2) {}
        }
      }
      setRecCounts(counts);
    }
    loadCounts();
  }, [recModal]); // refresh counts when modal closes

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Merch banner */}
      <a href="https://godtexasandtacos.com" target="_blank" rel="noopener noreferrer" style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 16px",
        background: "linear-gradient(135deg, rgba(232,177,0,0.15), rgba(232,177,0,0.06))",
        border: "1px solid rgba(232,177,0,0.25)", borderRadius: 12, textDecoration: "none",
      }}>
        <span style={{ fontSize: 22 }}>🤠</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, color: "#E8B100", fontWeight: 800 }}>Shop Rich O'Toole Merch</div>
          <div style={{ fontSize: 11, color: "#888" }}>godtexasandtacos.com</div>
        </div>
        <span style={{ fontSize: 14, color: "#E8B100" }}>→</span>
      </a>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>🎸 Tour Dates via Bandsintown</div>
        <a href={BANDSINTOWN_ARTIST} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "#555", textDecoration: "none" }}>See all →</a>
      </div>
      {TOUR_DATES.map((d, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14 }}>
            <div style={{ minWidth: 50, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" }}>{d.day}</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#E8B100", fontFamily: "'Bitter', serif" }}>{d.date.split(" ")[1]}</div>
              <div style={{ fontSize: 11, color: "#666" }}>{d.date.split(" ")[0]}</div>
            </div>
            <div style={{ flex: 1, borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: 12 }}>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "'Bitter', serif" }}>{d.venue}</div>
              <div style={{ fontSize: 12, color: "#ccc", fontWeight: 500, marginTop: 2 }}>{d.city}</div>
              <div style={{ fontSize: 10, color: "#E8B100", marginTop: 3 }}>🌮 {d.tacoHunt}</div>
              {d.rsvp > 0 && <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{d.rsvp} fans going</div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", minWidth: 90 }}>
              {d.soldOut ? (
                <span style={{ fontSize: 11, color: "#EF4444", fontWeight: 700, border: "1px solid rgba(239,68,68,0.25)", padding: "8px 12px", borderRadius: 8, textAlign: "center" }}>SOLD OUT</span>
              ) : (
                <a href={BANDSINTOWN_ARTIST} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#000", fontWeight: 800, background: "#E8B100", border: "none", padding: "10px 16px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", textDecoration: "none", textAlign: "center" }}>RSVP</a>
              )}
              {!d.soldOut && (
                <button onClick={() => setRecModal(i)}
                  style={{ fontSize: 11, color: "#E8B100", fontWeight: 700, background: "rgba(232,177,0,0.08)", border: "1px solid rgba(232,177,0,0.2)", padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                  🌮 Fan Picks{recCounts[i] > 0 ? (" (" + recCounts[i] + ")") : ""}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {/* Recommendation modal */}
      {recModal !== null && (
        <RecommendModal tourDate={TOUR_DATES[recModal]} tourIndex={recModal} onClose={() => setRecModal(null)} />
      )}
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
                {a.current && <span style={{ fontSize: 11, color: "#E8B100", background: "rgba(232,177,0,0.15)", padding: "3px 8px", borderRadius: 4, fontWeight: 700 }}>NEW</span>}
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
  const isAdmin = user?.role === "admin";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid " + (isAdmin ? "rgba(232,177,0,0.2)" : "rgba(255,255,255,0.06)"), borderRadius: 14, padding: 20, textAlign: "center" }}>
        {isAdmin && (
          <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(232,177,0,0.15)", border: "1px solid rgba(232,177,0,0.3)", color: "#E8B100", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
            🎸 Admin · Artist Account
          </div>
        )}
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: isAdmin ? "linear-gradient(135deg, #E8B100, #D97706)" : "linear-gradient(135deg, #3B82F6, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: isAdmin ? "#000" : "#fff", margin: "0 auto 10px", border: isAdmin ? "2px solid #E8B100" : "none" }}>
          {(user?.name || "T")[0].toUpperCase()}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "'Bitter', serif" }}>{user?.name || "Taco Fan"}</div>
        <div style={{ fontSize: 11, color: "#888" }}>{user?.email}</div>
        <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{user?.city || "Texas"} · Joined {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Mar 2026"}</div>
        <div style={{ display: "inline-block", marginTop: 8, padding: "3px 10px", borderRadius: 6, background: isAdmin ? "rgba(232,177,0,0.1)" : "rgba(59,130,246,0.1)", color: isAdmin ? "#E8B100" : "#60A5FA", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
          {isAdmin ? "Artist" : "Fan"} Account
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 14 }}>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: "#E8B100" }}>{user?.reviewCount || 0}</div><div style={{ fontSize: 11, color: "#666" }}>Reviews</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: "#4ADE80" }}>{user?.agreeCount || 0}</div><div style={{ fontSize: 11, color: "#666" }}>Agrees</div></div>
          <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 800, color: "#60A5FA" }}>{user?.xp || 0}</div><div style={{ fontSize: 11, color: "#666" }}>XP</div></div>
        </div>
      </div>

      {/* Account settings */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 10, color: "#888", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Account</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { label: "Email", value: user?.email || "—" },
            { label: "Role", value: isAdmin ? "Admin (Artist)" : "Fan" },
            { label: "User ID", value: user?.id || "—" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
              <span style={{ fontSize: 12, color: "#888" }}>{item.label}</span>
              <span style={{ fontSize: 12, color: "#ccc", fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions info */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 10, color: "#888", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
          {isAdmin ? "🎸 Admin Permissions" : "✅ Your Permissions"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { action: "View reviews & map", allowed: true },
            { action: "Vote on debates", allowed: true },
            { action: "Recommend spots (Fan Picks)", allowed: true },
            { action: "Submit fan ratings", allowed: true },
            ...(isAdmin ? [
              { action: "Post highlighted reviews", allowed: true, admin: true },
              { action: "Manage tour dates", allowed: true, admin: true },
              { action: "Manage user accounts", allowed: true, admin: true },
            ] : []),
          ].map(p => (
            <div key={p.action} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
              <span style={{ fontSize: 12, color: p.admin ? "#E8B100" : "#4ADE80" }}>{p.allowed ? "✓" : "✕"}</span>
              <span style={{ fontSize: 12, color: p.admin ? "#E8B100" : "#ccc" }}>{p.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>🏆 Badges to Earn</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { icon: "🌮", name: "First Take", desc: "Submit your first review", locked: !isAdmin },
            { icon: "🔥", name: "Hot Streak", desc: "5 reviews in a row", locked: !isAdmin },
            { icon: "🤠", name: "Rich Approved", desc: "Rich agrees with your take", locked: true },
            { icon: "⭐", name: "Top 10", desc: "Hit the leaderboard", locked: true },
            { icon: "🗺️", name: "Explorer", desc: "Review in 3 cities", locked: !isAdmin },
            { icon: "🎸", name: "Show & Chow", desc: "Review at a tour stop", locked: !isAdmin },
          ].map(b => (
            <div key={b.name} style={{ width: "calc(50% - 5px)", padding: 10, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)", opacity: b.locked ? 0.4 : 1 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{b.icon}</div>
              <div style={{ fontSize: 11, color: "#ccc", fontWeight: 600 }}>{b.name}</div>
              <div style={{ fontSize: 11, color: "#666" }}>{b.desc}</div>
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
              {s.note && <span style={{ fontSize: 11, color: "#555" }}>{s.note}</span>}
            </a>
          ))}
        </div>
      </div>

      <button onClick={onLogout} style={{ ...btnSecondary, color: "#EF4444", borderColor: "rgba(239,68,68,0.2)" }}>Sign Out</button>
      <div style={{ textAlign: "center", fontSize: 11, color: "#333", padding: "4px 0" }}>Prototype v1 · Accounts stored locally</div>
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
  const [listExpanded, setListExpanded] = useState(null);
  const [votes, setVotes] = useState({});
  const [fanRatings, setFanRatings] = useState({});
  const [pollVotes, setPollVotes] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showTourDates, setShowTourDates] = useState(true);
  const [reviewFilter, setReviewFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [showIntro, setShowIntro] = useState(false);

  // Seed admin account + restore session on mount
  useEffect(() => {
    try {
      const usersRaw = localStorage.getItem("tt-users");
      const users = usersRaw ? JSON.parse(usersRaw) : {};
      // Seed Rich's admin account if not exists
      if (!users["rich@richotoole.com"]) {
        users["rich@richotoole.com"] = {
          id: "admin_rich",
          name: "Rich O'Toole",
          email: "rich@richotoole.com",
          passHash: btoa("GodTexasTacos2026:tunes-tacos-salt"),
          city: "Houston, TX",
          role: "admin",
          joinedAt: "2025-12-01T00:00:00Z",
          reviewCount: 16,
          agreeCount: 4200,
          xp: 9999,
        };
        localStorage.setItem("tt-users", JSON.stringify(users));
      }
      // Restore session
      const sessionRaw = localStorage.getItem("tt-session");
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        // Verify user still exists in users db
        if (users[session.email]) {
          setUser(users[session.email]);
        }
      }
    } catch (e) {}
    // Prototype: start in guest mode (skip splash)
    if (!localStorage.getItem("tt-session")) {
      setUser({ name: "Guest", city: "Texas", guest: true, role: "guest" });
    }
  }, []);

  const handleAuthStart = (mode) => {
    if (mode === "guest") {
      setUser({ name: "Guest", city: "Texas", guest: true, role: "guest" });
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

  const handleLogout = () => {
    localStorage.removeItem("tt-session");
    setUser({ name: "Guest", city: "Texas", guest: true, role: "guest" });
    setTab("map");
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
    map: (c) => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
    tour: (c) => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    music: (c) => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    profile: (c) => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
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
    <Shell><AuthScreen mode={authMode} onComplete={handleAuthComplete} onBack={() => setScreen("main")} /></Shell>
  );

  return (
    <Shell>
      <style>{`@keyframes eqB { from { height: 3px; } to { height: 14px; } }`}</style>
      <div style={{ position: "relative", zIndex: 1, paddingBottom: 120 }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Rich O'Toole's</div>
              <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: 0, fontFamily: "'Bitter', serif" }}>Tacos Setlist</h1>
            </div>
            <button onClick={() => setShowIntro(true)} style={{
              width: 22, height: 22, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)", color: "#555", fontSize: 11, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "inherit", marginTop: 14,
            }}>?</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: user?.role === "admin" ? "#E8B100" : "#888" }}>{user?.name || "Guest"}{user?.role === "admin" ? " 🎸" : ""}</div>
              <div style={{ fontSize: 11, color: "#555" }}>{user?.guest ? "Guest" : user?.role === "admin" ? "Admin" : "Fan"} · {TACO_SPOTS.length} spots</div>
            </div>
            <div onClick={() => setTab("profile")} style={{
              width: 34, height: 34, borderRadius: "50%",
              background: user?.role === "admin" ? "linear-gradient(135deg, #E8B100, #D97706)" : user?.guest ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #3B82F6, #2563EB)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900,
              color: user?.role === "admin" ? "#000" : "#fff", cursor: "pointer",
              border: user?.role === "admin" ? "2px solid #E8B100" : "none",
            }}>
              {(user?.name || "G")[0].toUpperCase()}
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

              {/* Selected spot review - from map pin tap */}
              {selectedSpot && (
                <div ref={el => {
                  if (el) {
                    setTimeout(() => {
                      const rect = el.getBoundingClientRect();
                      const viewH = window.innerHeight;
                      const targetY = viewH * 0.55;
                      const scrollBy = rect.top - targetY;
                      if (scrollBy > 20) window.scrollBy({ top: scrollBy, behavior: "smooth" });
                    }, 150);
                  }
                }}>
                  <ReviewCard spot={selectedSpot} userVote={votes[selectedSpot.id]} onVote={handleVote} onFanRate={handleFanRate} fanRatingSubmitted={fanRatings[selectedSpot.id]} expanded={true} onToggle={() => setSelectedSpot(null)} user={user} />
                </div>
              )}

              {/* Trending — horizontal scroll tiles */}
              {(() => {
                const trending = TACO_SPOTS.filter(s => s.trending);
                if (trending.length === 0) return null;
                return (
                  <div>
                    <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🔥 Trending</div>
                    <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
                      {trending.map(spot => (
                        <div key={spot.id} onClick={() => { const newId = expandedReview === spot.id ? null : spot.id; setExpandedReview(newId); setListExpanded(null); if (newId) setTimeout(() => { const el = document.getElementById("expanded-review"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100); }}
                          style={{ scrollSnapAlign: "start", minWidth: 160, maxWidth: 160, background: "rgba(255,255,255,0.03)", border: expandedReview === spot.id ? "1px solid rgba(232,177,0,0.4)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden", cursor: "pointer", flexShrink: 0 }}>
                          <div style={{ height: 90, backgroundImage: `url(${spot.images[0]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                          <div style={{ padding: "8px 10px" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 4 }}>{spot.name}</div>
                            <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{spot.city}</div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <div style={{ textAlign: "left" }}>
                                <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 1 }}>Rich</div>
                                <span style={{ fontSize: 16, fontWeight: 900, color: ratingColor(spot.richRating), fontFamily: "'Bitter', serif" }}>{spot.richRating}</span>
                              </div>
                              <div style={{ fontSize: 11, color: "#555", alignSelf: "flex-end", marginBottom: 2 }}>vs</div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 10, color: "#60A5FA", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 1 }}>Fans</div>
                                <span style={{ fontSize: 16, fontWeight: 900, color: "#60A5FA", fontFamily: "'Bitter', serif" }}>{spot.fanRating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Top Rated — horizontal scroll tiles */}
              {(() => {
                const topRated = [...TACO_SPOTS].sort((a, b) => b.richRating - a.richRating).slice(0, 6);
                return (
                  <div>
                    <div style={{ fontSize: 10, color: "#22C55E", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>⭐ Top Rated</div>
                    <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
                      {topRated.map((spot, i) => (
                        <div key={spot.id} onClick={() => { const newId = expandedReview === spot.id ? null : spot.id; setExpandedReview(newId); setListExpanded(null); if (newId) setTimeout(() => { const el = document.getElementById("expanded-review"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100); }}
                          style={{ scrollSnapAlign: "start", minWidth: 160, maxWidth: 160, background: "rgba(255,255,255,0.03)", border: expandedReview === spot.id ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden", cursor: "pointer", flexShrink: 0 }}>
                          <div style={{ height: 90, backgroundImage: `url(${spot.images[0]})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                            <div style={{ position: "absolute", top: 6, left: 6, background: "rgba(0,0,0,0.7)", color: "#E8B100", fontSize: 11, fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>#{i + 1}</div>
                          </div>
                          <div style={{ padding: "8px 10px" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 4 }}>{spot.name}</div>
                            <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{spot.city}</div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <div style={{ textAlign: "left" }}>
                                <div style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 1 }}>Rich</div>
                                <span style={{ fontSize: 16, fontWeight: 900, color: ratingColor(spot.richRating), fontFamily: "'Bitter', serif" }}>{spot.richRating}</span>
                              </div>
                              <div style={{ fontSize: 11, color: "#555", alignSelf: "flex-end", marginBottom: 2 }}>vs</div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 10, color: "#60A5FA", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 1 }}>Fans</div>
                                <span style={{ fontSize: 16, fontWeight: 900, color: "#60A5FA", fontFamily: "'Bitter', serif" }}>{spot.fanRating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Expanded review from tile tap */}
              {expandedReview && !selectedSpot && (() => {
                const spot = TACO_SPOTS.find(s => s.id === expandedReview);
                if (!spot) return null;
                return <div id="expanded-review"><ReviewCard spot={spot} userVote={votes[spot.id]} onVote={handleVote} onFanRate={handleFanRate} fanRatingSubmitted={fanRatings[spot.id]} expanded={true} onToggle={() => setExpandedReview(null)} user={user} /></div>;
              })()}

              {/* Fan Debate */}
              <PollWidget debate={DEBATES[0]} onVote={handlePollVote} userVote={pollVotes[DEBATES[0].id] ?? null} />

              {/* Region filters for full list */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0 10px" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                  <span style={{ fontSize: 10, color: "#E8B100", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>All Reviews</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 }}>
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
                        padding: "5px 10px", borderRadius: 8, border: regionFilter === r ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.08)",
                        background: regionFilter === r ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.03)",
                        color: regionFilter === r ? "#22C55E" : "#aaa", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                      }}>
                        {r === "All" ? "All" : r} <span style={{ color: "#555", fontSize: 10 }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grouped reviews */}
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
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 0 4px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 6,
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: "#22C55E", fontFamily: "'Bitter', serif" }}>{region}</span>
                      <span style={{ fontSize: 11, color: "#555" }}>{grouped[region].length}</span>
                      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
                      <span style={{ fontSize: 11, color: "#666" }}>Avg {(grouped[region].reduce((a, s) => a + s.richRating, 0) / grouped[region].length).toFixed(1)}</span>
                    </div>
                    {grouped[region].map(spot => (
                      <ReviewCard key={spot.id} spot={spot} userVote={votes[spot.id]} onVote={handleVote} onFanRate={handleFanRate} fanRatingSubmitted={fanRatings[spot.id]}
                        expanded={listExpanded === spot.id} onToggle={() => setListExpanded(listExpanded === spot.id ? null : spot.id)} user={user} />
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
                  <div style={{ fontSize: 11, color: "#888", marginBottom: 12 }}>Rate a spot. Prove Rich wrong.</div>
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
                <h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "'Bitter', serif", margin: "0 0 8px" }}>Join Tacos Setlist</h2>
                <p style={{ fontSize: 12, color: "#888", margin: "0 0 8px" }}>Create an account to submit reviews, vote on debates, and earn badges.</p>
                <p style={{ fontSize: 10, color: "#555", margin: "0 0 24px" }}>Guests can browse everything — sign up to participate.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={() => { setScreen("auth"); setAuthMode("signup"); }} style={btnPrimary}>Create Account</button>
                  <button onClick={() => { setScreen("auth"); setAuthMode("login"); }} style={btnSecondary}>Sign In</button>
                </div>
                <div style={{ marginTop: 24, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 11, color: "#444", marginBottom: 6 }}>GUEST PERMISSIONS</div>
                  <div style={{ fontSize: 11, color: "#666" }}>✓ View reviews · ✓ Browse map · ✓ See tour dates</div>
                  <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>✕ Rate · ✕ Recommend · ✕ Vote</div>
                </div>
              </div>
            ) : (
              <ProfileSection user={user} onLogout={handleLogout} />
            )
          )}

        </div>
      </div>

      {/* Intro overlay */}
      {showIntro && (
        <SplashScreen
          onGetStarted={(mode) => { setShowIntro(false); handleAuthStart(mode); }}
          onClose={() => setShowIntro(false)}
        />
      )}

      {/* Bottom nav */}
      <div className="shell-nav" style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%",
        background: "#1c1c2e", borderTop: "2px solid rgba(232,177,0,0.15)",
        display: "flex", justifyContent: "space-around", alignItems: "stretch",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        zIndex: 100,
        boxShadow: "0 -4px 24px rgba(0,0,0,0.7)",
      }}>
        {tabs.map(t => {
          const active = tab === t.id;
          const iconColor = active ? "#E8B100" : "#999";
          return (
            <button key={t.id} onClick={() => { setTab(t.id); setShowReviewForm(false); setShowShareCard(null); }}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: "10px 16px", position: "relative", flex: 1 }}>
              {/* Active indicator bar at top */}
              {active && <div style={{ position: "absolute", top: -2, left: "20%", right: "20%", height: 3, background: "#E8B100", borderRadius: "0 0 3px 3px" }} />}
              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? "rgba(232,177,0,0.15)" : "transparent",
                transition: "all 0.2s ease",
              }}>
                {tabIcons[t.id](iconColor)}
              </div>
              {/* Label */}
              <span style={{ fontSize: 12, color: active ? "#E8B100" : "#777", fontWeight: active ? 800 : 500, transition: "all 0.2s" }}>{t.label}</span>
              {/* Notification dot for Tour tab */}
              {t.id === "tour" && !active && <div style={{ position: "absolute", top: 8, right: "22%", width: 7, height: 7, borderRadius: "50%", background: "#EF4444" }} />}
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
// force redeploy 1772753418
