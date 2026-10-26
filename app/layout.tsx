import type { Metadata, Viewport } from "next";
import "./compiled.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "UDrive Rental Service | Premium Car & EV Rentals in Nepal",
  description:
    "Rent premium electric vehicles and reliable everyday cars in Nepal. Transparent daily, weekly, 15-day, and monthly rates with instant booking requests.",
  keywords: [
    "car rental Nepal",
    "EV rental Kathmandu",
    "UDrive Nepal",
    "electric vehicle rental",
    "Kathmandu car hire",
    "BYD rental Nepal",
    "Toyota Hilux rental Nepal",
  ],
  openGraph: {
    title: "UDrive Rental Service | Premium Car & EV Rentals in Nepal",
    description:
      "Explore 19 premium electric and fuel vehicles with transparent rates in Nepal. Instant booking requests and customer support.",
    url: "https://udrive.com.np",
    siteName: "UDrive Rental Service",
    locale: "en_NP",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101827",
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-offwhite text-midnight font-sans antialiased selection:bg-electric selection:text-midnight">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
