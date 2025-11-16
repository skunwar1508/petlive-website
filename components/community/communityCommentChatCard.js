import React, { Fragment, useMemo } from "react";
import authAxios from "../../services/authAxios";
import { toast } from "react-toastify";
import common from "../../services/common";
import Comment from "./comment";
import { Dropdown } from "react-bootstrap";
import { useParams } from "next/navigation";

const CommunityCommentChatCard = ({ data, hideComment }) => {
  const [postDetails, setPostDetails] = React.useState(data);
  const { id } = useParams();
  const {
    isMyPost,
    isAnonymouse,
    _id,
    selfLiked,
    selfDisliked,
    authorRole,
    content,
    authorDetails,
    image,
    viewsCount,
    selfViews,
    likeCount,
    dislikeCount,
    commentCount,
    isShowComment,
  } = postDetails;

  const likePost = (id) => {
    if (selfLiked) {
      return;
    }
    authAxios
      .get(`/community/post/${id}/like`)
      .then((response) => {
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          likeCount: prevDetails.likeCount + 1,
          selfLiked: true,
          selfDisliked: false,
          dislikeCount: selfDisliked
            ? Math.max(prevDetails.dislikeCount - 1, 0)
            : prevDetails.dislikeCount,
        }));
        toast.success(response?.data?.message || "Post liked successfully");
      })
      .catch((error) => {
        console.error(error);
        common.error(error);
      });
  };

  const dislikePost = (id) => {
    if (selfDisliked) {
      return;
    }
    authAxios
      .get(`/community/post/${id}/dislike`)
      .then((response) => {
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          dislikeCount: prevDetails.dislikeCount + 1,
          selfDisliked: true,
          selfLiked: false,
          likeCount: selfLiked
            ? Math.max(prevDetails.likeCount - 1, 0)
            : prevDetails.likeCount,
        }));
        toast.success(response?.data?.message || "Post disliked successfully");
      })
      .catch((error) => {
        common.error(error);
      });
  };
  const markFlag = (flag, postId, communityId) => {
    authAxios
      .post(`/community/flag/add`, {
        communityId: communityId,
        communityPostId: postId,
        reason: flag,
      })
      .then((response) => {
        toast.success(response?.data?.message || "Post disliked successfully");
      })
      .catch((error) => {
        common.error(error);
      });
  };

  return (
    <div className="CommunityCommetBody">
      <div className="aritcleUseImg">
        {isAnonymouse ? (
          <img
            className="img-fluid"
            src="/images/user.png"
            alt="Anonymous User"
          />
        ) : (
          <img
            className="img-fluid"
            src={authorDetails?.profileImage?.path || "/images/user.png"}
            alt={authorDetails?.profileImage?.path || "Patient Image"}
          />
        )}
      </div>
      <div className="aritcleCommentContent">
        <div className="contentbox">
        {isAnonymouse ? (
          <h4>Anonymous</h4>
        ) : (
          <Fragment>
            {authorRole === "doctor" && (
              <h4>
                Dr. {authorDetails?.firstName + " " + authorDetails?.lastName}
              </h4>
            )}
            {authorRole === "patient" && (
              <h4>{authorDetails?.fullName || "Patient Name"} </h4>
            )}
            {authorRole === "admin" && <h4>Admin</h4>}
          </Fragment>
        )}

        <p>{content}</p>
        </div>
        {image?.path && (
          <div className="chatImg">
            <img
              className="img-fluid"
              src={image?.path || "/images/user.png"}
              alt={image?.path || "Patient Image"}
            />
          </div>
        )}
        <ul className="communityReplyComtLts">
          {isMyPost && (
            <li>
              <span>
                <img src="/images/eye-icon.svg" alt="messages" />
                {/* <svg
                  width="17"
                  height="13"
                  viewBox="0 0 17 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2602 5.82387C15.4755 6.12562 15.5832 6.2772 15.5832 6.50033C15.5832 6.72416 15.4755 6.87503 15.2602 7.17678C14.2926 8.53395 11.8212 11.4587 8.49984 11.4587C5.17775 11.4587 2.70709 8.53324 1.7395 7.17678C1.52417 6.87503 1.4165 6.72345 1.4165 6.50033C1.4165 6.27649 1.52417 6.12562 1.7395 5.82387C2.70709 4.4667 5.17846 1.54199 8.49984 1.54199C11.8219 1.54199 14.2926 4.46741 15.2602 5.82387Z"
                    stroke="#019889"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.625 6.5C10.625 5.93641 10.4011 5.39591 10.0026 4.9974C9.60409 4.59888 9.06358 4.375 8.5 4.375C7.93641 4.375 7.39591 4.59888 6.9974 4.9974C6.59888 5.39591 6.375 5.93641 6.375 6.5C6.375 7.06358 6.59888 7.60409 6.9974 8.0026C7.39591 8.40112 7.93641 8.625 8.5 8.625C9.06358 8.625 9.60409 8.40112 10.0026 8.0026C10.4011 7.60409 10.625 7.06358 10.625 6.5Z"
                    stroke="#019889"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
              </span>
              {viewsCount || 0}
            </li>
          )}
          <li>
            <span
              onClick={() => likePost(_id)}
              //   style={{ color: selfLiked ? "#019889" : "inherit" }}
            >
              <img src="/images/thumb-like.svg" alt="Like Count" />
              {/* <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.770752 7.5L7.49992 1.125L14.2291 7.5H9.97909V13.875H5.02075V7.5H0.770752Z"
                  stroke={selfLiked ? "#019889" : "#019889"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={selfLiked ? "#019889" : "none"}
                />
              </svg> */}
            </span>
            {likeCount || 0}
          </li>
          {/* <li>
                        <span onClick={() => dislikePost(_id)} style={{ color: selfDisliked ? '#019889' : 'inherit' }}>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.770752 7.5L7.49992 13.875L14.2291 7.5H9.97909V1.125H5.02075V7.5H0.770752Z" stroke={selfDisliked ? '#019889' : '#019889'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={selfDisliked ? '#019889' : 'none'} />
                            </svg>
                        </span>
                        {dislikeCount || 0}
                    </li> */}
          <li>
            <a
              className="btn-anchor-theme font-w-700"
              onClick={() => hideComment(_id)}
            >
              <span>
                <img src="/images/msg-icon.svg" alt="messages" />
                {/* <svg
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.54167 4.94134C1.54167 4.3343 1.54167 3.92205 1.56858 3.6033C1.59338 3.29305 1.63942 3.13367 1.69608 3.02317L0.433833 2.38001C0.258875 2.72355 0.18875 3.08976 0.156167 3.48784C0.125 3.87742 0.125 4.35767 0.125 4.94134H1.54167ZM1.54167 6.49967V4.94134H0.125V6.49967H1.54167ZM0.125 6.49967V10.0413H1.54167V6.49967H0.125ZM0.125 10.0413V12.1054H1.54167V10.0413H0.125ZM0.125 12.1054C0.125 13.0199 1.23142 13.4782 1.87812 12.8315L0.876542 11.8299C0.931026 11.7754 1.00045 11.7382 1.07604 11.7232C1.15163 11.7082 1.22998 11.7159 1.30119 11.7454C1.37239 11.7749 1.43324 11.8248 1.47605 11.8889C1.51886 11.953 1.54169 12.0284 1.54167 12.1054H0.125ZM1.87812 12.8315L3.96062 10.7497L2.95833 9.74809L0.876542 11.8299L1.87812 12.8315ZM8.76667 9.33301H3.95992V10.7497H8.76667V9.33301ZM10.6848 9.17859C10.5743 9.23526 10.4157 9.2813 10.1047 9.30609C9.78596 9.3323 9.37371 9.33301 8.76667 9.33301V10.7497C9.35033 10.7497 9.82987 10.7497 10.2202 10.7185C10.6182 10.6859 10.9845 10.6158 11.328 10.4408L10.6848 9.17859ZM11.3039 8.55951C11.1681 8.82606 10.9514 9.04277 10.6848 9.17859L11.328 10.4408C11.8611 10.1692 12.2945 9.73578 12.5662 9.20267L11.3039 8.55951ZM11.4583 6.64134C11.4583 7.24838 11.4583 7.66063 11.4314 7.97938C11.4066 8.28963 11.3606 8.44901 11.3039 8.55951L12.5662 9.20267C12.7411 8.85913 12.8112 8.49292 12.8438 8.09484C12.8757 7.70526 12.875 7.22501 12.875 6.64134H11.4583ZM11.4583 4.94134V6.64134H12.875V4.94134H11.4583ZM11.3039 3.02317C11.3606 3.13367 11.4066 3.29234 11.4314 3.6033C11.4583 3.92205 11.4583 4.3343 11.4583 4.94134H12.875C12.875 4.35767 12.875 3.87813 12.8438 3.48784C12.8112 3.08976 12.7411 2.72355 12.5662 2.38001L11.3039 3.02317ZM10.6848 2.40409C10.9514 2.53991 11.1681 2.75662 11.3039 3.02317L12.5662 2.38001C12.2945 1.84691 11.8611 1.41348 11.328 1.14184L10.6848 2.40409ZM8.76667 2.24967C9.37371 2.24967 9.78596 2.24967 10.1047 2.27659C10.415 2.30138 10.5743 2.34742 10.6848 2.40409L11.328 1.14184C10.9845 0.966883 10.6182 0.896758 10.2202 0.864175C9.83058 0.833008 9.35033 0.833008 8.76667 0.833008V2.24967ZM4.23333 2.24967H8.76667V0.833008H4.23333V2.24967ZM2.31517 2.40409C2.42567 2.34742 2.58433 2.30138 2.89529 2.27659C3.21404 2.24967 3.62629 2.24967 4.23333 2.24967V0.833008C3.64967 0.833008 3.17013 0.833008 2.77983 0.864175C2.38175 0.896758 2.01554 0.966883 1.672 1.14184L2.31517 2.40409ZM1.69608 3.02317C1.8319 2.75662 2.04862 2.53991 2.31517 2.40409L1.672 1.14184C1.1389 1.41348 0.705471 1.84691 0.433833 2.38001L1.69608 3.02317ZM3.95992 10.7497V9.33301C3.58422 9.33309 3.22395 9.4824 2.95833 9.74809L3.95992 10.7497Z"
                    fill="#019889"
                  />
                  <path
                    d="M3.66675 4.375H9.33342M3.66675 7.20833H7.20841"
                    stroke="#019889"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
              </span>
              {commentCount || 0}
            </a>
          </li>
          {!isMyPost && (
            <li>
              <Dropdown className="flagDropdown">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  <img src="/images/flag-icon.svg" alt="Like Count" />
                  {/* <svg
                    width="12"
                    height="14"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.2998 7V10.75C1.2998 10.9271 1.2398 11.0756 1.1198 11.1956C0.999805 11.3156 0.851471 11.3754 0.674805 11.375C0.498138 11.3746 0.349805 11.3146 0.229805 11.195C0.109805 11.0754 0.0498047 10.9271 0.0498047 10.75V1.375C0.0498047 1.19792 0.109805 1.04958 0.229805 0.93C0.349805 0.810417 0.498138 0.750417 0.674805 0.75H5.15918C5.30501 0.75 5.43522 0.796875 5.5498 0.890625C5.66439 0.984375 5.7373 1.10417 5.76855 1.25L5.9248 2H8.7998C8.97689 2 9.12543 2.06 9.24543 2.18C9.36543 2.3 9.42522 2.44833 9.4248 2.625V7.625C9.4248 7.80208 9.3648 7.95063 9.2448 8.07063C9.1248 8.19063 8.97647 8.25042 8.7998 8.25H5.56543C5.4196 8.25 5.28939 8.20312 5.1748 8.10938C5.06022 8.01562 4.9873 7.89583 4.95605 7.75L4.7998 7H1.2998ZM6.08105 7H8.1748V3.25H5.40918C5.26335 3.25 5.13314 3.20312 5.01855 3.10938C4.90397 3.01562 4.83105 2.89583 4.7998 2.75L4.64355 2H1.2998V5.75H5.31543C5.46126 5.75 5.59147 5.79688 5.70605 5.89062C5.82064 5.98438 5.89355 6.10417 5.9248 6.25L6.08105 7Z"
                      fill="#019889"
                    />
                  </svg> */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => markFlag("Mark as inappropriate", _id, id)}
                  >
                    Mark as inappropriate
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => markFlag("Mark as Abuse", _id, id)}
                  >
                    Mark as Abuse
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          )}
        </ul>
        {isShowComment && (
          <div className="communityReplyComtBx">
            <Comment postId={_id} hideComment={hideComment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityCommentChatCard;
