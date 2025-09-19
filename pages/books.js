import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Books() {
  return (
    <>
      <Head>
        <title>Furr Baby Blog</title>
        <meta name="description" content="Read our latest pet care blogs" />
      </Head>
      <Header />
      <main className="">
        <section className="page-section">
          <h1 className="heading-secondary">
            Let’s Make Your Pet Famous! (At Least in Our Eyes)
          </h1>
          <div className="container">
            <h2>For (Meow Meow)</h2>
            <div className="row g-4">
              <div className="col-lg-6 ">
                <div className="book-cover">
                  <img src="/images/Group 62.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="book-cover">
                  <img src="/images/Group 63.png" alt="" />
                </div>
              </div>
            </div>
            <h2>For (Woof Woof)</h2>
            <div className="row g-4">
              <div className="col-lg-6 ">
                <div className="book-cover">
                  <img src="/images/Group 67.png" alt="" />
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="book-cover">
                  <img src="/images/Group 61.p ng" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
