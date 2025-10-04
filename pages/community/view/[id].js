import authAxios from "@/services/authAxios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommunityCommentList from "@/components/community/communityCommentList";

const CommunityView = () => {
  const [communityDetails, setCommunityDetails] = useState({});
  const params = useParams() || {};
  const communityId = params.id;
  const router = useRouter();

  // Fetch community details based on slug or ID
  const fetchCommunityDetails = async () => {
    try {
      const { data } = await authAxios.get(`/community/get/${communityId}`);
      setCommunityDetails(data?.data || {});
    } catch (error) {
      console.error("Error fetching community details:", error);
    }
  };
  useEffect(() => {
    if (communityId) fetchCommunityDetails();
  }, [communityId]);
  return (
    <>
      <section className="page-section community-chat-page">
        <div className="container">
          <h1 className="heading-secondary">
            {communityDetails?.name} ({communityDetails?.members?.length || 0}{" "}
            members)
          </h1>
          <div className="row g-4">
            <div className="col-lg-12">
              {communityDetails?.isMember && (
                <CommunityCommentList id={communityId} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunityView;
