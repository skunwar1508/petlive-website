import Link from 'next/link'
import React from 'react'
import PageModule from '../pagination/pagination'
import common from '@/services/common'

const BlogList = ({ initialPaginData, pageHasChanged }) => {
  return (
    <section className="page-section all-blogs">
        <h1 className="heading-secondary">Blogs</h1>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-12 d-flex flex-column gap-3">
              {initialPaginData?.list?.length > 0 ? (
                initialPaginData?.list.map((blog, index) => (
                  <Link
                    href={`/blogs/view/${blog?._id}-${blog?.slug}`}
                    key={index}
                    className="blog-card  "
                  >
                    <img
                      src={
                        blog?.coverImage?.path || "/assets/images/default.png"
                      }
                      alt={blog?.title}
                      className=" img-fluid"
                    />
                    <div className="blog-text">
                      <h5>{blog?.title}</h5>
                      <p>{common.truncateAndClean(blog?.content, 100)}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No blogs available</p>
              )}
              {initialPaginData?.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                  <PageModule
                    totalItems={initialPaginData.totalItemsCount}
                    itemsPerPage={initialPaginData.itemsCountPerPage}
                    currentPage={initialPaginData.activePage}
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
  )
}

export default BlogList