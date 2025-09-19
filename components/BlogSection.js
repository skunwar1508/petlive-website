import Link from "next/link";

const BlogSection = () => {
  const blogs = [
    {
      img: "/images/blog-dog.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.",
    },
    {
      img: "/images/blog-dog-2.png",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.",
    },
    {
      img: "/images/blog-cat.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.",
    },
    {
      img: "/images/blog-dog-3.jpg",
      title: "Blog Heading",
      desc: "Lorem ipsum dolor sit amet consectetur. Eros vitae uta at faucibus sollicitudin enim.",
    },
  ];

  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="heading-secondary">Blogs</h2>
        <div className="row g-4">
          {/* Left side - big blog */}
          <div className="col-lg-6">
            <Link href="/blog" className="blog-card large-card">
              <img
                src={blogs[0].img}
                alt={blogs[0].title}
                className="img-fluid"
              />
              <div className="blog-text">
                <h5>{blogs[0].title}</h5>
                <p>{blogs[0].desc}</p>
              </div>
            </Link>
          </div>

          {/* Right side - small blogs */}
          <div className="col-lg-6 d-flex flex-column gap-3">
            {blogs.slice(1).map((blog, index) => (
              <Link href="/blog" key={index} className="blog-card small-card ">
                <img src={blog.img} alt={blog.title} className="img-fluid" />
                <div className="blog-text">
                  <h5>{blog.title}</h5>
                  <p>{blog.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
