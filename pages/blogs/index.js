
import { paginateBlog } from "@/utils/serverApi";
import BlogList from "@/components/blog/blogList";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Blogs({ initialPaginData }) {
  const router = useRouter();


  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      router.push(
        `/blogs?page=${pageNumber}${searchString ? `&searchString=${searchString}` : ""
        }${category ? `&category=${category}` : ""}`
      );
    }
  };
  const metaTags = {
    title: "Pet Care Blogs & Tips for Pet Parents | Furr Baby",
    description: "Explore Furr Baby blogs for expert pet care tips, training guides, health advice, and helpful insights for dog and cat parents.",
    keywords: "pet community, dog lovers, cat lovers, pet care, pet health, pet tips, furr baby",
    ogUrl: "https://www.furrbaby.in/",
    ogType: "website",
    ogTitle: "Pet Care Blogs & Tips for Pet Parents | Furr Baby",
    ogDescription: "Explore Furr Baby blogs for expert pet care tips, training guides, health advice, and helpful insights for dog and cat parents.",
    ogImage: "https://www.furrbaby.in/furr_baby_logo.svg",
    twitterCard: "summary_large_image",
    twitterDomain: "www.furrbaby.in",
    twitterUrl: "https://www.furrbaby.in/",
    twitterTitle: "Pet Care Blogs & Tips for Pet Parents | Furr Baby",
    twitterDescription: "Explore Furr Baby blogs for expert pet care tips, training guides, health advice, and helpful insights for dog and cat parents.",
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
      <BlogList initialPaginData={initialPaginData} pageHasChanged={pageHasChanged} />
    </>
  );
}


export async function getServerSideProps(context) {
  const paginData = await paginateBlog({
    page: context.query.page || 1,
    perPage: 10,
    searchString: context.query.searchString || "",
    category: context.query.category || "",
  });

  return {
    props: {
      initialPaginData: paginData,
    },
  };
}