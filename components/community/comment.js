import React, { Fragment, useEffect, useRef, useState } from "react";
import authAxios from "../../services/authAxios";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import Moment from "react-moment";
import { useFormik } from "formik";
import * as Yup from "yup";

/* ================= COMMENT BOX ================= */

const CommentBox = ({
    data,
    currentReply,
    setActiveReply,
    refreshComments,
    isChildReply,
    viewComments,
    setViewComments,
}) => {
    const isReplyOpen = currentReply === data._id;

    const replyFormik = useFormik({
        initialValues: {
            reply: "",
            commentObjId: data._id,
        },
        validationSchema: Yup.object({
            reply: Yup.string().required("Please enter the comment"),
        }),
        onSubmit: async (values) => {
            try {
                await authAxios.post(
                    "/article/comment/reply/add",
                    values
                );
                toast.success("Reply submitted");
                replyFormik.resetForm();
                setActiveReply(null);
                refreshComments();
            } catch {
                toast.error("Failed to submit reply");
            }
        },
    });

console.log("Rendering CommentBox for comment ID:", data);
    // Helper to get user image or fallback
    const getUserImage = () => {
        if (isChildReply) {
            return (
                data?.doctorId?.profileImage?.path ||
                data?.patientId?.profileImage?.path ||
                "/images/user.png"
            );
        } else {
            return (
                data?.senderId?.profileImage?.path ||
                "/images/user.png"
            );
        }
    };

    return (
        <div className="aritcleCommentListBody">
            <div className="aritcleUseImg">
                <img
                    src={getUserImage()}
                    alt="user"
                />
            </div>

            <div className="aritcleCommentContent">
                <div className="artcomntHead d-flex justify-content-between">
                    <h4>
                        {isChildReply
                            ? data?.doctorId?.firstName ||
                              data?.patientId?.name ||
                              "Anonymous"
                            : data?.senderRole === "doctor"
                                ? `${data?.senderId?.firstName} ${data?.senderId?.lastName}`
                                : data?.senderId?.name || "Anonymous"}
                    </h4>

                    <span className="commentTime">
                        <Moment format="MMM DD, YYYY">
                            {data?._createdAt}
                        </Moment>
                    </span>
                </div>

                <p>{isChildReply ? data?.reply : data?.comment}</p>

                {/* Reply Box */}
                {isReplyOpen && (
                    <form
                        onSubmit={replyFormik.handleSubmit}
                        className="patientWritMsgBx mt-2"
                    >
                        <input
                            {...replyFormik.getFieldProps("reply")}
                            placeholder="Write reply..."
                        />
                        <button type="submit">
                            <Icon icon="material-symbols:send-outline" />
                        </button>
                    </form>
                )}

                {/* Replies */}
                {viewComments === data._id &&
                    data?.replies?.map((reply, i) => (
                        <CommentBox
                            key={i}
                            data={reply}
                            isChildReply
                        />
                    ))}

                {/* View replies */}
                {!isChildReply &&
                    data?.replies?.length > 0 && (
                        <button
                            className="viewcommentbtn"
                            onClick={() =>
                                setViewComments(
                                    viewComments === data._id
                                        ? null
                                        : data._id
                                )
                            }
                        >
                            {viewComments === data._id
                                ? "Hide replies"
                                : `View ${data.replies.length} replies`}
                        </button>
                    )}
            </div>
        </div>
    );
};

/* ================= MAIN COMMENT COMPONENT ================= */

const Comment = ({ postId }) => {
    const [commentList, setCommentList] = useState([]);
    const [currentReply, setCurrentReply] = useState(null);
    const [viewComments, setViewComments] = useState(null);

    const fetchedRef = useRef(false);

    /* ✅ FETCH ONLY ONCE PER postId */
    const fetchComments = async () => {
        try {
            const { data } = await authAxios.get(
                `/community/post/${postId}/getAll`
            );
            setCommentList(data?.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchedRef.current = false;
        setCommentList([]);
        fetchComments();
        fetchedRef.current = true;
    }, [postId]);

    /* ================= ADD COMMENT ================= */

    const commentFormik = useFormik({
        initialValues: { comment: "" },
        validationSchema: Yup.object({
            comment: Yup.string().required("Please enter the comment"),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await authAxios.post(
                    `/community/post/${postId}/comment`,
                    values
                );
                toast.success("Comment added");

                setCommentList((prev) => [
                    ...prev,
                    data.data,
                ]);

                commentFormik.resetForm();
            } catch {
                toast.error("Failed to submit comment");
            }
        },
    });

    return (
        <div className="commentsComntyWrp">
            <div className="articleCommetList">
                <div className="articleCommentTitle">
                    Comments
                </div>

                <div
                    style={{ maxHeight: 200, overflowY: "auto" }}
                >
                    {commentList.map((item, i) => (
                        <CommentBox
                            key={i}
                            data={item}
                            currentReply={currentReply}
                            setActiveReply={setCurrentReply}
                            refreshComments={fetchComments}
                            viewComments={viewComments}
                            setViewComments={setViewComments}
                        />
                    ))}
                </div>
            </div>

            {/* Add comment */}
            <form
                onSubmit={commentFormik.handleSubmit}
                className="patientWritMsgBx"
            >
                <input
                    {...commentFormik.getFieldProps("comment")}
                    placeholder="Write a comment..."
                />
                <button type="submit">
                    <Icon icon="material-symbols:send-outline" />
                </button>
            </form>
        </div>
    );
};

export default Comment;
