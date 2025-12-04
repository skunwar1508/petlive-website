import "@/styles/globals.css";

import { ToastContainer } from "react-toastify";
import { AppProvider } from "@/context/context";
import Layout from "@/layout/layout.index";
import Head from "next/head";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Loader from "@/components/common/loader";
import { paginateBlogCategory } from "@/utils/serverApi";



const MyApp = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    // show loader on hard refresh until window 'load' fires
    if (typeof window !== "undefined" && document.readyState !== "complete") {
      setLoading(true);
      const onLoad = () => setLoading(false);
      window.addEventListener("load", onLoad);
      return () => {
        window.removeEventListener("load", onLoad);
        Router.events.off("routeChangeStart", handleStart);
        Router.events.off("routeChangeComplete", handleComplete);
        Router.events.off("routeChangeError", handleComplete);
      };
    }

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.furrbaby.com";
  const canonicalPath = (typeof window === "undefined"
    ? pageProps?.asPath || router.asPath || "/"
    : window.location.pathname || "/"
  );
  const canonical = baseUrl + canonicalPath;

  const seo = {
    title: pageProps?.seo?.title || (pageProps?.pageTitle ? `${pageProps.pageTitle} | Furr Baby` : "Furr Baby"),
    description: pageProps?.seo?.description || "Furr Baby - India’s first all-in-one platform created for pets and the humans who adore them.",
    keywords: pageProps?.seo?.keywords || "pets, animals, adoption, care, furr baby",
    canonical,
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://www.furrbaby.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Furr Join Pet Community for Dog and Cat Lovers | Furr Baby" />
        <meta property="og:description" content="India’s first all-in-one platform to consult vets online, join pet lover communities, and even find your pet’s perfect playdate." />
        <meta property="og:image" content="https://www.furrbaby.in/furr_baby_logo.svg" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="furrbaby.in" />
        <meta property="twitter:url" content="https://www.furrbaby.in/" />
        <meta name="twitter:title" content="Furr Join Pet Community for Dog and Cat Lovers | Furr Baby" />
        <meta name="twitter:description" content="India’s first all-in-one platform to consult vets online, join pet lover communities, and even find your pet’s perfect playdate." />
        <meta name="twitter:image" content="https://www.furrbaby.in/furr_baby_logo.svg" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="P_5TvA14QVBk3MgvQszjgETAy86YzQz3TQ_zGfPkBW8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={seo.canonical} />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S9F45V5TQ1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S9F45V5TQ1');
            `,
          }}
        ></script>
      </Head>
      <AppProvider pageProps={{ ...pageProps }} values={{ loading, setLoading }}>
        <Layout pageProps={{ ...pageProps }}>
          <ToastContainer />
          {loading && (
            <Loader />
          )}
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const blogCategory = await paginateBlogCategory({});
  let appProps = {};
  if (typeof appContext.Component.getInitialProps === "function") {
    appProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  // Merge menus and offerHeader into pageProps
  return {
    ...appProps,
    pageProps: {
      ...(appProps.pageProps || {}),
      blogCategory: blogCategory.list || [],
    },
  };
};

export default MyApp;