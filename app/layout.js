export const metadata = {
  title: "Rich O'Toole's Taco Tour | God, Texas & Tacos",
  description: "Follow Rich O'Toole as he reviews the best tacos on tour. Rate, debate, and discover taco spots across Texas and beyond. Tacos. Tunes. Takes.",
  openGraph: {
    title: "Rich O'Toole's Taco Tour",
    description: "Tacos. Tunes. Takes. 🌮🎸🔥",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0d0d14" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&family=Courier+Prime&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0d0d14", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
