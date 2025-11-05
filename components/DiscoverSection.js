import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import common from "@/services/common";
import Link from "next/link";
import authAxios from "@/services/authAxios";

const DiscoverSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const searchString = searchParams.get("searchString") || "";

  const [paginData, setPaginData] = useState({
    list: [],
    activePage: page,
    itemsCountPerPage: 3,
    totalItemsCount: 0,
  });

  const getData = useCallback(async () => {
    common.loader(true);
    try {
      const res = await authAxios({
        method: "POST",
        url: `/community/paginate`,
        data: {
          page,
          perPage: 3,
          searchString: searchString,
        },
      });
      setPaginData((prev) => ({
        ...prev,
        list: res?.data?.data || [],
        activePage: page,
        totalItemsCount: res?.data?.totalCount || 0,
      }));
    } catch (error) {
      console.log(error)
      common.error(error);
    }
    common.loader(false);
  }, [page, searchString]);

  useEffect(() => {
    getData();
  }, [getData]);

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
          {paginData?.list?.map((d, index) => (
            <div key={index} className="col-lg-4 d-flex flex-column">
              <Link className="d-block" href={`/community/info/${d?._id}`}>
                <div className="blog-card  ">
                  <img
                    src={d?.image?.path || "/assets/images/default.png"}
                    alt={d?.name}
                    className="blog-card-img img-fluid"
                  />
                  <div className="blog-text">
                    <h5>{d?.name}</h5>
                    <div className="arw-link text-center">
                      Join Community
                      <span className="arrow">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
