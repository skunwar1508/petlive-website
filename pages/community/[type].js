import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import common from "@/services/common";
import { useEffect, useState } from "react";
import authAxios from "@/services/authAxios";
import PageModule from "@/components/pagination/pagination";
import Link from "next/link";
import { paginateCommunity } from "@/utils/serverApi";
import { useAppContext } from "@/context/context";

export default function Communities({ communityData }) {
  const { isLoggedIn, setShowAskLogin } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchString = searchParams.get("searchString") || "";
  const { type } = router.query;

  // default to 'new', update when `type` becomes available
  const [commmunityStatus, setCommunityStatus] = useState("new");

  useEffect(() => {
    // avoid running while `type` is undefined on first render
    if (!type) return;
    setCommunityStatus(type === "my" ? "my" : "new");
  }, [type]);

  const pageHasChanged = (pageNumber) => {
    if (pageNumber !== communityData?.activePage) {
      // navigate (server-side) to the new page for the current `type`
      router.push(
        `/community/${type}?page=${pageNumber}${searchString ? `&searchString=${searchString}` : ""
        }`
      );
    }
  };

  const handleChangeCommunityStatus = (status) => {
    if (commmunityStatus === status) return;
    // if user is NOT logged in and tries to open "my" communities -> ask to login
    if (!isLoggedIn && status === "my") {
      setShowAskLogin(true);
      return;
    }
    setCommunityStatus(status);
    router.push(`/community/${status}`);
  };

  return (
    <>
      {/* Add a key based on `type` so the section remounts when route param changes */}
      <section key={type || "new"} className="page-section community-page">
        <h1 className="heading-secondary d-flex justify-content-center">
          <div className="communityStatusTabs">
            <span
              className={commmunityStatus === "new" ? "active" : ""}
              onClick={() => handleChangeCommunityStatus("new")}
            >
              New Community
            </span>
            <span
              className={commmunityStatus === "my" ? "active" : ""}
              onClick={() => handleChangeCommunityStatus("my")}
            >
              My Community
            </span>
          </div>
        </h1>
        <div className="container">
          <div className="row g-4">
            {communityData?.list?.map((d, index) => (
              <div
                // prefer stable key
                key={d?._id ?? index}
                className="col-lg-4 d-flex flex-column gap-3"
              >
                <Link href={`/community/info/${d?._id}`} className="blog-card">
                  <img
                    src={d?.image?.path || "/assets/images/default.png"}
                    alt={d?.name}
                    className="blog-card-img img-fluid"
                  />
                  <div className="blog-text">
                    <h5>{d?.name}</h5>
                    <p>{common.truncateAndClean(d?.description, 150)}</p>
                    {d?.isJoined ? (
                      <div className="cta-btn">View Community</div>
                    ) : (
                      <div className="cta-btn">Join Community</div>
                    )}
                  </div>
                </Link>
              </div>
            ))}

            {communityData?.list?.length > 0 && (
              <div className="d-flex justify-content-center mt-4">
                <PageModule
                  totalItems={communityData?.totalItemsCount}
                  itemsPerPage={communityData?.itemsCountPerPage || 10}
                  currentPage={communityData?.activePage || 1}
                  range={3}
                  theme="paging-4"
                  pageChange={pageHasChanged}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  // read cookies from request and parse to get token
  const cookieHeader = context.req?.headers?.cookie || "";
  const cookies = cookieHeader
    .split(";")
    .filter(Boolean)
    .reduce((acc, c) => {
      const [k, ...v] = c.split("=");
      acc[k.trim()] = decodeURIComponent((v || []).join("=").trim());
      return acc;
    }, {});
  // common cookie names used for tokens; adjust as needed
  const token = cookies.token || cookies.authToken || cookies.access_token || cookies.jwt || "";
  const communityData = await paginateCommunity(context.query, token);

  return {
    props: {
      communityData: communityData
    },
  };
}
