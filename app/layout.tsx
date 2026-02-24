import type { Metadata } from "next";
import { Arya, Noto_Serif_Devanagari, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import FallingLeaves from "@/components/falling-leaves";
import BottomBanner from "@/components/banner";
import BodyWrapper from "@/components/BodyWrapper";

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

export const metadata: Metadata = {
  title: "SPJV App",
  description: "SPJV APP made by love for all.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${arya.variable}  ${poppins.variable}`}>
      <link rel="icon" href="/spjv logo favicon.png" sizes="any" />
      <body lang="en" className="hero-bg font-arya" >
        <BodyWrapper>
        <FallingLeaves/>
        <BottomBanner/> 
        <Navbar />
        {children}
        <Footer/>
        </BodyWrapper>
      </body>
    </html>
  );
}
