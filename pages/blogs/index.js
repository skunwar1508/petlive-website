import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, useCallback } from "react";
import authAxios from "@/services/authAxios";
import common from "@/services/common";
import PageModule from "@/components/pagination/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Blogs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const searchString = searchParams.get("searchString") || "";

  const [paginData, setPaginData] = useState({
    list: [],
    activePage: page,
    itemsCountPerPage: 10,
    totalItemsCount: 0,
  });

  const getData = useCallback(async () => {
    common.loader(true);
    try {
      const res = await authAxios({
        method: "POST",
        url: `/blog/paginate`,
        data: {
          page,
          search: searchString,
        },
      });
      setPaginData((prev) => ({
        ...prev,
        list: res?.data?.data || [],
        activePage: page,
        totalItemsCount: res?.data?.totalCount || 0,
      }));
    } catch (error) {
      common.error(error);
    }
    common.loader(false);
  }, [page, searchString]);

  useEffect(() => {
    getData();
  }, [getData]);

  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== paginData.activePage) {
      router.push(`/blogs?page=${pageNumber}${searchString ? `&searchString=${searchString}` : ""}`);
    }
  };

  return (
    <>
      <section className="page-section">
        <h1 className="heading-secondary">Blogs</h1>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-12 d-flex flex-column gap-3">
              {paginData?.list?.length > 0 ? (
                paginData?.list?.map((blog, index) => (
                  <Link href={`/blogs/${blog?._id}/${blog?.slug}`} key={index}>
                    <div className="blog-card  ">
                      <img
                        src={blog?.coverImage?.path || "/assets/images/default.png"}
                        alt={blog?.title}
                        className="img-fluid"
                      />
                      <div className="blog-text">
                        <h5>{blog?.title}</h5>
                        <p>{common.truncateAndClean(blog?.content, 100)}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No blogs available</p>
              )}
              {paginData?.list?.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                  <PageModule
                    totalItems={paginData.totalItemsCount}
                    itemsPerPage={paginData.itemsCountPerPage}
                    currentPage={paginData.activePage}
                    range={3}
                    theme="paging-4"
                    pageChange={pageHasChanged}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
