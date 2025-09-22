import authAxios from "@/services/authAxios";
import common from "@/services/common";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);


  // Fetch blogs from an API or use static data
  const fetchBlogs = async () => {
    try {
      const response = await authAxios.get("/blog/top-featured");
      setBlogs(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {

    fetchBlogs();
  }, []);

  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="heading-secondary">Blogs</h2>
        <div className="row g-4">
          {/* Left side - big blog */}


          {
            blogs.length > 0 ? (
              <>
                {
                  blogs?.map((blog, index) => (
                    <div className={`col-lg-6 ${index === 0 ? '' : 'd-flex flex-column gap-3'}`} key={index}>
                      <Link href="/blog" className="blog-card large-card">
                        <img
                          src={blog?.coverImage?.path || '/assets/images/default.png'}
                          alt={blog?.title}
                          className="img-fluid"
                        />
                        <div className="blog-text">
                          <h5>{blog?.title}</h5>
                          <p>{common.truncateAndClean(blog?.content, 100)}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </>
            ) : (
              <p>No blogs available</p>
            )
          }

        </div>
      </div>
    </section>
  );
};

export default BlogSection;
