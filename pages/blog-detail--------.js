import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogDetail() {
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
            <div className="row mb-5">
              <div className="col-lg-8 ">
                <h3 className="heading-tertiary">
                  Let’s Make Your Pet Famous! <br /> (At Least in Our Eyes)
                </h3>
                <p>21 December 2505 | Reading Time : 3 Min.</p>
                <p>
                  Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents. No red carpet
                  needed!Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents.No red carpet needed!
                  Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents. No red carpet needed!
                </p>
                <p>
                  Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents. No red carpet
                  needed!Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents.No red carpet needed!
                  Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents. No red carpet needed!
                </p>
                <p>
                  Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents. No red carpet{" "}
                </p>
              </div>
              <div className="col-lg-4 ">
                <h3 className="heading-tertiary">Recent Blogs</h3>
                {blogs.slice(1).map((blog, index) => (
                  <div key={index} className="blog-card small-card ">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="img-fluid"
                    />
                    <div className="blog-text">
                      <h5>{blog.title}</h5>
                      <p>{blog.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-12 ">
                <p>
                  Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents. No red carpet
                  needed!Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents.No red carpet needed!
                  Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents. No red carpet needed!
                </p>
                <p>
                  Create a free digital scrapbook to celebrate your pet’s
                  quirks, adventures, and secret talents. No red carpet{" "}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
