import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CommiunityInfo() {
  const blogs = [
    {
      img: "/images/blog-dog.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      img: "/images/blog-dog-2.png",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet cuta at faucibus sollicitn enim.",
    },
    {
      img: "/images/blog-cat.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      img: "/images/blog-dog-3.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. ",
    },
  ];
  return (
    <>
      <Head>
        <title>Furr Baby Blog</title>
        <meta name="description" content="Read our latest pet care blogs" />
      </Head>
      <Header />
      <main className="">
        <section className="page-section blog-detail-page">
          <div className="container">
            <h1 className="heading-primary">Community Name</h1>
            <div className="row mb-5">
              <div className="col-lg-12 ">
                <div href="/blog" className="blog-card large-card ">
                  <img
                    src={blogs[0].img}
                    alt={blogs[0].title}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-5">
              <p>Active Members : 98</p>
              <p>Created Date : 23 March 2022</p>
            </div>
            <div className="mb-5">
              <p>
                Create a free digital scrapbook to celebrate your pet’s quirks,
                adventures, and secret talent No red carpet needed!Create a free
                digital scrapbook to celebrate your pet’s quirks, adventures,
                and secret talents. No red carpet needed! Create a free digital
                scrapbook to celebrate your pet’s quirks, adventures, secret
              </p>
              <p>
                talents. No red carpet needed!Create a free digital scrapbook to
                celebrate your pet’s quirks, adventures, and secret talents. No
                red carpet needed!Create a free digital scrapbook to celebrate
                your pet’s quirks, adventures, and secret talents. No red carpet
                needed! Create a free digital scrapbook to celebrate your pet’s
                quirks, adventures, secret
              </p>
              <p>
                talents. No red carpet needed!Create a free digital scrapbook to
                celebrate your pet’s quirks, adventures, and secret talents. No
                red carpet needed!Create a free digital scrapbook to celebrate
                your pet’s quirks, adventures, and secret talents. Create a free
                digital scrapbook to celebrate your pet’s quirks, adventures,
                secret talents. No red carpet needed!
              </p>
            </div>
            <div className="cta-btn">Join Community</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
