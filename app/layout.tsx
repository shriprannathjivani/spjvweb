import type { Metadata } from "next";
import { Arya, Noto_Serif_Devanagari, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import FallingLeaves from "@/components/falling-leaves";
import BottomBanner from "@/components/banner";
import BodyWrapper from "@/components/BodyWrapper";
import ScrollToTop from "@/components/ScrollToTop"
import { Toaster } from "sonner";
import Script from 'next/script'

// 1. Define Open Graph and standard metadata
export const metadata = {
  title: 'Shri Prannath Ji Vani',
  description: 'श्री प्राणनाथ जी की वाणी आत्मा, सृष्टि, परम सत्य और हमारे परम प्रियतम से जुड़े गहरे सवालों के जवाब सरलता से समझाती है।',
  openGraph: {
    title: 'Shri Prannath Ji Vani',
    description: 'श्री प्राणनाथ जी की वाणी आत्मा, सृष्टि, परम सत्य और हमारे परम प्रियतम से जुड़े गहरे सवालों के जवाब सरलता से समझाती है।',
    url: 'https://shriprannathjivani.com',
    siteName: 'Shri Prannath Ji Vani',
    images: [
      {
        url: 'https://shriprannathjivani.com/whatshareimg.jpg',
        width: 800,
        height: 600,
      },
    ],
    type: 'article',
  },
  // Additional thumbnail links if needed
  other: {
    'thumbnail': 'https://shriprannathjivani.com/whatshareimg.jpg',
  },
}


// 2. Structured Data (JSON-LD)
const jsonLd = {
  '@context': 'http://schema.org',
  '@type': 'MediaObject',
  'name': 'Shri Prannath Ji Vani',
  'description': 'श्री प्राणनाथ जी की वाणी आत्मा, सृष्टि, परम सत्य और हमारे परम प्रियतम से जुड़े गहरे सवालों के जवाब सरलता से समझाती है।',
  'thumbnailUrl': 'https://shriprannathjivani.com/whatshareimg.jpg',
  'contentUrl': 'https://shriprannathjivani.com/',
}

const arya = Arya({
  subsets: ["devanagari"],
  weight: ["400", "700"],
  variable: "--font-arya",
  display: "swap",
});

const noto = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto",
  display: "swap",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"], // choose the weights you need
  subsets: ["latin"],                 // for English/Latin text
  variable: "--font-poppins",
  display: "swap",
});

const basePath =
  process.env.NODE_ENV === "production" ? "" : "";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${arya.variable}  ${poppins.variable}`}>
      <head>
        <Script
          id="schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href={`${basePath}/spjv logo favicon.png`} sizes="any" />
      </head>
      <body lang="en" className="hero-bg font-arya" >
        <Toaster />
        <BodyWrapper>
          <FallingLeaves />
          <BottomBanner />
          <Navbar />
          {children}
          <ScrollToTop />
          <Footer />
        </BodyWrapper>
      </body>
    </html>
  );
}
