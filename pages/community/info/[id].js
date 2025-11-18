import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import authAxios from "@/services/authAxios";
import DateFormate from "@/components/DateFormate";
import common from "@/services/common";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchCommunityDetails } from "@/utils/serverApi";
import { useAppContext } from "@/context/context";

export default function CommunityInfo({ communityDetails }) {
  const { isLoggedIn, setShowAskLogin } = useAppContext();
  const router = useRouter();
  console.log("communityDetails", communityDetails);

  const JoinedCommunity = () => {
    if (isLoggedIn === false) {
      setShowAskLogin(true);
      return;
    } else {
      authAxios
        .get(`/community/member/join/${communityDetails._id}`)
        .then((response) => {
          fetchCommunityDetails();
          common.success("You have successfully joined the community.");
          router.push(`/community/view/${communityDetails._id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <section className="page-section blog-detail-page">
        <div className="container">
          <h1 className="heading-secondary">{communityDetails?.name}</h1>
          <div className="row mb-5">
            <div className="col-lg-6 ">
              <Link href="/blog" className="blog-card large-card ">
                <img
                  src={
                    communityDetails?.image?.path ||
                    "/assets/images/default.jpg"
                  }
                  alt={communityDetails?.name}
                  className=" img-fluid"
                />
              </Link>
            </div>
            <div className="col-lg-6 ">
              <div className="d-flex justify-content-between mb-3">
                <p>Active Members : {communityDetails?.members?.length || 0}</p>
                <p>
                  Created Date :{" "}
                  <DateFormate
                    date={communityDetails?.createdAt}
                    formate={"DD MMMM YYYY"}
                  />
                </p>
              </div>
              <div
                className="mb-5"
                dangerouslySetInnerHTML={{ __html: communityDetails?.description }}
              ></div>

              <div className="text-center">
                {communityDetails?.isMember ? (
                  <Link href={`/community/view/${communityDetails._id}`} className="cta-btn">
                    View Community
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="cta-btn"
                    onClick={() => JoinedCommunity()}
                  >
                    Join Community
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps(context) {  // read cookies from request and parse to get token
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
  const { data } = await fetchCommunityDetails(context, token);

  return {
    props: {
      communityDetails: data,
    }
  }
}
