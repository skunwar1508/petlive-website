import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import authAxios from "@/services/authAxios";
import { useParams } from "next/navigation";
import Moment from "react-moment";

export default function BlogDetail() {
  const [blogDetails, setBlogDetails] = useState({});
  const params = useParams() || {};
  const blogId = params.blogId;

  useEffect(() => {
    // Fetch blog details based on slug or ID
    const fetchBlogDetails = async () => {
      try {
        const {data} = await authAxios.get(`/blog/get/${blogId}`);
        setBlogDetails(data?.data || {});
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [blogId]);
  return (
    <>
      
        <section className="page-section blog-detail-page">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-12 ">
                <div href="/blog" className="blog-card large-card ">
                  <img
                    src={blogDetails?.coverImage?.path || "/assets/images/default.png"}
                    alt={blogDetails?.title}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-8 ">
                <h3 className="heading-tertiary">
                  {blogDetails?.title || "Blog Title"}
                </h3>
                <p><Moment format="DD MMMM YYYY">{blogDetails?.createdAt}</Moment></p>
                <div dangerouslySetInnerHTML={{ __html: blogDetails?.content }}></div>
              </div>
              <div className="col-lg-4 ">
                <h3 className="heading-tertiary">Recent Blogs</h3>
                {/* {blogs.slice(1).map((blog, index) => (
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
                ))} */}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
