import Link from "next/link";

const DiscoverSection = () => {
  const blogs = [
    {
      img: "/images/blog-dog-3.jpg",
      title: "Community Name",
      link: "Join Name",
    },
    {
      img: "/images/blog-dog-3.jpg",
      title: "Community Name",
      link: "Join Name",
    },
    {
      img: "/images/blog-dog-3.jpg",
      title: "Community Name",
      link: "Join Name",
    },
  ];

  return (
    <section className="page-section bg-paw-img bg-paw-img-dark community-page discover-section">
      <span className="third-bg"></span>
      <div className="container">
        <h2 className="heading-secondary">
          Discover Pet Communities That Match Your Interests
        </h2>
        <h6>
          Join specialized communities based on your pet type, interests, and
          location. Find your perfect match among our diverse pet parent groups.
        </h6>
        <div className="row g-4">
          {/* Right side - small blogs */}
          {blogs.slice(0).map((blog, index) => (
            <div key={index} className="col-lg-4 d-flex flex-column">
              <div className="blog-card  ">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="blog-card-img img-fluid"
                />
                <div className="blog-text">
                  <h5>{blog.title}</h5>
                  <Link className="arw-link" href="/community">
                    {blog.link}
                    <span className="arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
