import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import common from "@/services/common";
import Link from "next/link";

export default function NewCommunity() {
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
      common.error(error);
    }
    common.loader(false);
  }, [page, searchString]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Head>
        <title>Furr Baby Community</title>
        <meta name="description" content="Read our latest pet care blogs" />
      </Head>

      <main className="">
        <section className="page-section community-page">
          <h1 className="heading-secondary">New Community</h1>
          <div className="container">
            <div className="row g-4">
              {/* Right side - small blogs */}
              {paginData?.list?.map((d, index) => (
                <div key={index} className="col-lg-4 d-flex flex-column gap-3">
                  <Link
                    href={`/community/info/${d?._id}`}
                    className="blog-card  "
                  >
                    <div className="blog-card  ">
                      <img
                        src={d?.image?.path || "/assets/images/default.png"}
                        alt={d?.name}
                        className="img-fluid"
                      />
                      <div className="blog-text">
                        <h5>{d?.name}</h5>
                        <p>{common.truncateAndClean(d?.description, 150)}</p>
                        <button className="cta-btn">Join Community</button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
