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
  return (
    <>
    {/* <Header /> */}
      <HeroSection />
      <ServicesSection />
      <DiscoverSection discoverData={discoverData} />
      {/* <TrustBadges /> */}
      <BlogSection blogData={blogData} />
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
