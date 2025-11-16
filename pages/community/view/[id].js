import authAxios from "@/services/authAxios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommunityCommentList from "@/components/community/communityCommentList";
import { fetchCommunityDetails } from "@/utils/serverApi";

const CommunityView = ({ communityDetails }) => {
  return (
    <>
      <section className="page-section community-chat-page">
        <div className="container">
        <h1 className="heading-secondary">
          {communityDetails?.name} ({communityDetails?.members?.length || 0}{" "}
          members)
        </h1>
          <div className="communityChatBody">
            {/* <h1 className="heading-secondary">
              {communityDetails?.name} ({communityDetails?.members?.length || 0}{" "}
              members)
            </h1> */}

            {communityDetails?.isMember && (
              <CommunityCommentList
                id={communityDetails._id}
                communityDetails={communityDetails}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

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
  const {data} = await fetchCommunityDetails(context, token);

  return {
    props: {
      communityDetails: data,
    }
  }
}


export default CommunityView;
