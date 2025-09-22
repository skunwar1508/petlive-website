import Head from "next/head";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

import { Fredoka } from "next/font/google";
import { Poppins } from "next/font/google";
import TrustBadges from "@/components/TrustBadges";
import FamousSection from "@/components/FamousSection";
import ServicesSection from "@/components/ServicesSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fredoka",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <FamousSection />
      <ServicesSection />
      <BlogSection />
    </>
  );
}
