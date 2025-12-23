import authAxios from "@/services/authAxios";
import { useParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CommunityCommentList from "@/components/community/communityCommentList";
import { useAppContext } from "@/context/context";

const CommunityView = () => {
  const { id } = useParams(); // community id from route
  const [communityDetails, setCommunityDetails] = useState(null);
  const {setBreadcrumbs, setIsShowBreadcrumbs, loading, setLoading} = useAppContext();

  useEffect(() => {
    if (!id) return;

    const fetchCommunity = async () => {
      try {
        setLoading(true);
        const { data } = await authAxios.get(`/community/get/${id}`);
        console.log("Fetched community details:", data);
        setCommunityDetails(data?.data || null);
        setBreadcrumbs({
          title: data?.data?.name || 'Community',
          description: `${data?.data?.members?.length || 0} members`,
          _id: data?.data?._id
        });
        setIsShowBreadcrumbs(true);
      } catch (error) {
        console.error("Error fetching community:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();

  }, [id]);
  // You can use useLayoutEffect instead of useEffect if you want the effect to run synchronously after all DOM mutations but before the browser paints.
  // This is useful if you are manipulating the DOM directly (like adding/removing classes).
  // Replace useEffect with useLayoutEffect as follows:


  useLayoutEffect(() => {
    // Hide footer on this page
    if (typeof window !== "undefined") {
      document.body.classList.add("hide-footer");
      return () => {
        document.body.classList.remove("hide-footer");
      };
    }
  }, []);

  // if (loading) {
  //   return (
  //     <div
  //     className="loading"
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       minHeight: "80vh",
  //       fontSize: "1.5rem",
  //       fontWeight: "500"
  //     }}
  //     >
  //     Loading...
  //     </div>
  //   );
  // }

  // if (!communityDetails) {
  //   return null;
  // }
  return (
    <div className="community-app-screen">

      {/* Body */}
      <main className="community-app-body">
        {communityDetails?.isMember ? (
          <CommunityCommentList
            id={communityDetails._id}
            communityDetails={communityDetails}
          />
        ) : (
          <div className="not-member">
            You are not a member of this community
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunityView;
