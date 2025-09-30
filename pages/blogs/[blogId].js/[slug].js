import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { use, useEffect, useState } from "react";
import authAxios from "@/services/authAxios";
import { useParams } from "next/navigation";
import Moment from "react-moment";
import common from "@/services/common";
import dynamic from "next/dynamic";
import Link from "next/link";
const DateFormate = dynamic(() => import("@/components/DateFormate"), { ssr: false });

export default function BlogDetail() {
  const [blogDetails, setBlogDetails] = useState({});
  const [recentBlogs, setRecentBlogs] = useState([]);
  const params = useParams() || {};
  const blogId = params.blogId;

  useEffect(() => {
    // Fetch blog details based on slug or ID
    const fetchBlogDetails = async () => {
      try {
        const { data } = await authAxios.get(`/blog/get/${blogId}`);
        setBlogDetails(data?.data || {});
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    if (blogId) fetchBlogDetails();
  }, [blogId]);
  const getData = async () => {
    common.loader(true);
    try {
      const res = await authAxios({
        method: "POST",
        url: `/blog/paginate`,
        data: {
          createdAt: -1
        },
      });
      setRecentBlogs(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
    }
    common.loader(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
              <p><DateFormate format="DD MMMM YYYY" date={blogDetails?.createdAt} /></p>
              <div dangerouslySetInnerHTML={{ __html: blogDetails?.content }}></div>
            </div>
            <div className="col-lg-4 ">
              <h3 className="heading-tertiary">Recent Blogs</h3>
              {recentBlogs?.map((blog, index) => (
                <Link href={`/blogs/${blog?._id}/${blog?.slug}`} key={index}>
                  <div className="blog-card small-card ">
                    <img
                      src={blog?.coverImage?.path || "/assets/images/default.png"}
                      alt={blog?.title}
                      className="img-fluid"
                    />
                    <div className="blog-text">
                      <h5>{blog?.title}</h5>
                      <p>{common.truncateAndClean(blog?.content, 30)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
