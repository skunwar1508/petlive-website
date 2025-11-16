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
          <h1 className="heading-primary">{communityDetails?.name}</h1>
          <div className="row mb-5">
            <div className="col-lg-12 ">
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
          </div>
          <div className="d-flex justify-content-between mb-5">
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
      </section>
    </>
  );
}
export async function getServerSideProps(context) {
  const { data } = await fetchCommunityDetails(context);

  return {
    props: {
      communityDetails: data,
    }
  }
}
