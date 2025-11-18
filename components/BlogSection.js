import authAxios from "@/services/authAxios";
import common from "@/services/common";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogSection = ({ blogData }) => {

  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="heading-secondary">Blogs</h2>
        <div className="row justify-content-center">
          {/* Left side - big blog */}

          {blogData?.length > 0 ? (
            <>
              {blogData?.map((blog, index) => (
                <div
                  className={`col-lg-4 ${
                    index === 0 ? "" : ""
                  }`}
                  key={index}
                >
                  <Link
                    href={`/blogs/view/${blog?._id}-${blog?.slug}`}
                    className="blog-card large-card"
                  >
                    <img
                      src={
                        blog?.coverImage?.path || "/assets/images/default.png"
                      }
                      alt={blog?.title}
                      className="blog-card-img img-fluid"
                    />
                    <div className="blog-text">
                      <h5>{blog?.title}</h5>
                      <p>{common.truncateAndClean(blog?.content, 100)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
