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

export async function getServerSideProps(context) {
  const {data} = await fetchCommunityDetails(context);

  return {
    props: {
      communityDetails: data,
    }
  }
}


export default CommunityView;
