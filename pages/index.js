import HeroSection from "@/components/HeroSection";

import { Fredoka } from "next/font/google";
import { Poppins } from "next/font/google";
import TrustBadges from "@/components/TrustBadges";
import FamousSection from "@/components/FamousSection";
import ServicesSection from "@/components/ServicesSection";
import BlogSection from "@/components/BlogSection";
import DiscoverSection from "@/components/DiscoverSection";
import { communityPaging, fetchTopFeaturedBlogs } from "@/utils/serverApi";
import FaqSection from "@/components/faqs/homeFaqs";
import AskVet from "@/components/askVetComp";
import Head from "next/head";

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

export default function Home({ discoverData, blogData }) {
  const metaTags = {
    title: "Join Pet Community for Dog and Cat Lovers | Furr Baby",
    description: "Join the Furr Baby pet community to connect, share stories, get tips, and explore trusted guidance for your pet’s health, care, and daily well-being.",
    keywords: "pet community, dog lovers, cat lovers, pet care, pet health, pet tips, furr baby",
    ogUrl: "https://www.furrbaby.in/",
    ogType: "website",
    ogTitle: "Join Pet Community for Dog and Cat Lovers | Furr Baby",
    ogDescription: "Join the Furr Baby pet community to connect, share stories, get tips, and explore trusted guidance for your pet’s health, care, and daily well-being.",
    ogImage: "https://www.furrbaby.in/furr_baby_logo.svg",
    twitterCard: "summary_large_image",
    twitterDomain: "furrbaby.in",
    twitterUrl: "https://www.furrbaby.in/",
    twitterTitle: "Join Pet Community for Dog and Cat Lovers | Furr Baby",
    twitterDescription: "Join the Furr Baby pet community to connect, share stories, get tips, and explore trusted guidance for your pet’s health, care, and daily well-being.",
    twitterImage: "https://www.furrbaby.in/furr_baby_logo.svg",
  };
  return (
    <>
      <Head>
        <title>{metaTags.title}</title>
        <meta name="title" content={metaTags.title} />
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content={metaTags.ogUrl} />
        <meta property="og:type" content={metaTags.ogType} />
        <meta property="og:title" content={metaTags.ogTitle} />
        <meta property="og:description" content={metaTags.ogDescription} />
        <meta property="og:image" content={metaTags.ogImage} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={metaTags.twitterCard} />
        <meta property="twitter:domain" content={metaTags.twitterDomain} />
        <meta property="twitter:url" content={metaTags.twitterUrl} />
        <meta name="twitter:title" content={metaTags.twitterTitle} />
        <meta name="twitter:description" content={metaTags.twitterDescription} />
        <meta name="twitter:image" content={metaTags.twitterImage} />
      </Head>
      {/* <Header /> */}
      <HeroSection />
      <ServicesSection />
      <DiscoverSection discoverData={discoverData} />
      {/* <TrustBadges /> */}
      <BlogSection blogData={blogData} />
      <AskVet />
      <FamousSection />
      <FaqSection isHome={true} totalCounts={5} />
    </>
  );
}


export async function getServerSideProps(context) {
  const {data} = await communityPaging(context);
  const {data: blogData} = await fetchTopFeaturedBlogs();

  return {
    props: {
      discoverData: data,
      blogData: blogData,
    }
  }
}
