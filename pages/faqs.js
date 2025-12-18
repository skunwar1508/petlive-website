import FaqSection from '@/components/faqs/homeFaqs'
import Head from 'next/head'
import React from 'react'

const Faqs = () => {
  const metaTags = {
    title: "Furr Baby FAQs – Answers to Common Pet Care Queries",
    description: "Find quick answers to common questions about Furr Baby’s services, community features, pet care guidance, and support for pet parents.",
    keywords: "pet community, dog lovers, cat lovers, pet care, pet health, pet tips, furr baby",
    ogUrl: "https://www.furrbaby.in/",
    ogType: "website",
    ogTitle: "Furr Baby FAQs – Answers to Common Pet Care Queries",
    ogDescription: "Find quick answers to common questions about Furr Baby’s services, community features, pet care guidance, and support for pet parents.",
    ogImage: "https://www.furrbaby.in/furr_baby_logo.svg",
    twitterCard: "summary_large_image",
    twitterDomain: "www.furrbaby.in",
    twitterUrl: "https://www.furrbaby.in/",
    twitterTitle: "Furr Baby FAQs – Answers to Common Pet Care Queries",
    twitterDescription: "Find quick answers to common questions about Furr Baby’s services, community features, pet care guidance, and support for pet parents.",
    twitterImage: "https://www.furrbaby.in/furr_baby_logo.svg",
  };
  return (
    <div>
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
      <FaqSection totalCounts={20} isHome={false} />
    </div>
  )
}

export default Faqs
