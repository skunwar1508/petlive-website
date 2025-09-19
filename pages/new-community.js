import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewCommunity() {
  const blogs = [
    {
      img: "/images/blog-dog.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur.  ",
    },
    {
      img: "/images/blog-dog-2.png",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.",
    },
    {
      img: "/images/blog-cat.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur.  ",
    },
    {
      img: "/images/blog-dog-3.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.",
    },
    {
      img: "/images/blog-dog.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      img: "/images/blog-dog-2.png",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.",
    },
    {
      img: "/images/blog-cat.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      img: "/images/blog-dog-3.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.",
    },
  ];

  return (
    <>
      <Head>
        <title>Furr Baby Community</title>
        <meta name="description" content="Read our latest pet care blogs" />
      </Head>
      <Header />
      <main className="">
        <section className="page-section community-page">
          <h1 className="heading-secondary">New Community</h1>
          <div className="container">
            <div className="row g-4">
              {/* Right side - small blogs */}
              {blogs.slice(1).map((blog, index) => (
                <div key={index} className="col-lg-4 d-flex flex-column gap-3">
                  <div className="blog-card  ">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="img-fluid"
                    />
                    <div className="blog-text">
                      <h5>{blog.title}</h5>
                      <p>{blog.desc}</p>
                      <div className="cta-btn">Join Community</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
