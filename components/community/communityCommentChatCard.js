import React, { Fragment, lazy, memo, Suspense, useState } from "react";
import authAxios from "../../services/authAxios";
import { toast } from "react-toastify";
import common from "../../services/common";
import Comment from "./comment";
import { Dropdown } from "react-bootstrap";
import { useParams } from "next/navigation";
const FancyboxWrapper = lazy(() => import("../common/fancyboxWrapper"));

const CommunityCommentChatCard = ({ data, hideComment }) => {
  const [postDetails, setPostDetails] = useState(data);
  const { id: communityId } = useParams();

  const {
    _id,
    isMyPost,
    isAnonymouse,
    selfLiked,
    selfDisliked,
    authorRole,
    content,
    authorDetails,
    image,
    viewsCount,
    likeCount,
    dislikeCount,
    commentCount,
  } = postDetails;

  /* ================= LIKE POST ================= */
  const likePost = async () => {
    if (selfLiked) return;

    try {
      const response = await authAxios.get(
        `/community/post/${_id}/like`
      );

      setPostDetails((prev) => ({
        ...prev,
        likeCount: prev.likeCount + 1,
        selfLiked: true,
        selfDisliked: false,
        dislikeCount: selfDisliked
          ? Math.max(prev.dislikeCount - 1, 0)
          : prev.dislikeCount,
      }));

      toast.success(
        response?.data?.message || "Post liked successfully"
      );
    } catch (error) {
      common.error(error);
    }
  };

  /* ================= DISLIKE POST ================= */
  const dislikePost = async () => {
    if (selfDisliked) return;

    try {
      const response = await authAxios.get(
        `/community/post/${_id}/dislike`
      );

      setPostDetails((prev) => ({
        ...prev,
        dislikeCount: prev.dislikeCount + 1,
        selfDisliked: true,
        selfLiked: false,
        likeCount: selfLiked
          ? Math.max(prev.likeCount - 1, 0)
          : prev.likeCount,
      }));

      toast.success(
        response?.data?.message || "Post disliked successfully"
      );
    } catch (error) {
      common.error(error);
    }
  };

  /* ================= FLAG POST ================= */
  const markFlag = async (reason) => {
    try {
      const response = await authAxios.post(
        `/community/flag/add`,
        {
          communityId,
          communityPostId: _id,
          reason,
        }
      );

      toast.success(
        response?.data?.message || "Post reported successfully"
      );
    } catch (error) {
      common.error(error);
    }
  };

  /* ================= AUTHOR NAME ================= */
  const renderAuthorName = () => {
    if (isAnonymouse) return "Anonymous";
    if (authorRole === "doctor")
      return `Dr. ${authorDetails?.firstName || ""} ${authorDetails?.lastName || ""
        }`;
    if (authorRole === "admin") return "Admin";
    return authorDetails?.name || "User";
  };

  /* ================= JSX ================= */
  return (
    <div className="post-card">

      {/* Avatar */}
      <div className="post-avatar">
        <img
          src={
            isAnonymouse
              ? "/images/user.png"
              : authorDetails?.profileImage?.path ||
              "/images/user.png"
          }
          alt="User"
        />
      </div>

      {/* Content */}
      <div className="post-body">

        {/* Header */}
        <div className="post-header">
          <h4>{renderAuthorName()}</h4>

          {!isMyPost && (
            <Dropdown className="flagDropdown">
              <Dropdown.Toggle variant="none">
                <img
                  src="/images/flag-icon.svg"
                  alt="Flag"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    markFlag("Mark as inappropriate")
                  }
                >
                  Mark as inappropriate
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    markFlag("Mark as Abuse")
                  }
                >
                  Mark as Abuse
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        {/* Text */}
        {content && (
          <p className="post-text">{content}</p>
        )}

        {/* Image */}
        {image?.path && (
          <Suspense fallback={null}>
            <FancyboxWrapper>
              <a
                href={image.path}
                data-fancybox="chat-images"
                className="post-image"
              >
                <img
                  src={image.path}
                  alt="Post"
                  className="chat-image"
                />
              </a>
            </FancyboxWrapper>
          </Suspense>
        )}

        {/* Actions */}
        <div className="post-actions">
          {isMyPost && (
            <span className="action">
              <img
                src="/images/eye-icon.svg"
                alt="Views"
              />
              {viewsCount || 0}
            </span>
          )}

          <button
            type="button"
            className={`action ${selfLiked ? "active" : ""
              }`}
            onClick={likePost}
          >
            <img
              src="/images/thumb-like.svg"
              alt="Like"
            />
            {likeCount || 0}
          </button>

          {/* Optional dislike (kept functional) */}
          {/* <button onClick={dislikePost}>
            👎 {dislikeCount || 0}
          </button> */}

          <button
            type="button"
            className="action"
            onClick={() => hideComment(_id)}
          >
            <img
              src="/images/msg-icon.svg"
              alt="Comments"
            />
            {commentCount || 0}
          </button>
        </div>
        {/* Comments */}
        {data?.isShowComment && (
          <div className="post-comments">
            <Comment
              postId={_id}
              hideComment={hideComment}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityCommentChatCard;
