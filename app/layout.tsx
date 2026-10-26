import type { Metadata, Viewport } from "next";
import "./compiled.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "U Drive | Every Ride A New Story - Car & EV Rentals in Nepal",
  description:
    "Rent premium electric vehicles and dependable fuel cars across Nepal with U Drive. Transparent daily, weekly, 15-day, and monthly rates with instant reservation requests.",
  keywords: [
    "U Drive",
    "U Drive Nepal",
    "car rental Nepal",
    "EV rental Kathmandu",
    "electric vehicle rental Nepal",
    "Kathmandu car hire",
    "Deepal S07 rental",
    "BYD rental Nepal",
    "Toyota Hilux rental Nepal",
  ],
  openGraph: {
    title: "U Drive | Every Ride A New Story - Car & EV Rentals in Nepal",
    description:
      "Explore 19 verified electric and fuel vehicles with transparent published rates in Nepal. Every Ride A New Story.",
    url: "https://udrive.com.np",
    siteName: "U Drive",
    locale: "en_NP",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080A0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F7F4] text-[#080A0D] font-sans antialiased selection:bg-[#FFD83D] selection:text-[#080A0D]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
