import CommunitypostChatCard from "./communityCommentChatCard";
import authAxios from "../../services/authAxios";
import ImageFormik from "../common/fileUpload";
import { useAppContext } from "@/context/context";
import { useEffect, useRef, useState } from "react";

const CommunityCommentList = ({ id }) => {
  const { user } = useAppContext();

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState(null);

  /* 🔒 REFS (do NOT trigger re-render) */
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);

  const scrollRef = useRef(null);

  /* ================= FETCH POSTS ================= */
  const fetchPosts = async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;

    try {
      const { data } = await authAxios.post(
        `/community/post/${id}/paginate`,
        {
          page: pageRef.current,
          perPage: 10,
        }
      );

      const newPosts = (data?.data || [])
        .reverse()
        .map((p) => ({ ...p, isShowComment: false }));

      setPosts((prev) => [...newPosts, ...prev]);

      hasMoreRef.current = newPosts.length === 10;
      pageRef.current += 1;
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      loadingRef.current = false;
    }
  };

  /* ================= RESET ON ID CHANGE ================= */
  useEffect(() => {
    setPosts([]);
    pageRef.current = 1;
    hasMoreRef.current = true;
    loadingRef.current = false;
    fetchPosts();
  }, [id]);

  /* ================= SCROLL (TOP LOAD) ================= */
  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop === 0) {
      fetchPosts();
      e.currentTarget.scrollTop = 120;
    }
  };

  /* ================= SUBMIT POST ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() && !postImage?._id) return;

    try {
      const { data } = await authAxios.post(`/community/post/${id}`, {
        content: newPost,
        image: postImage?._id || null,
      });

      setPosts((prev) => [
        ...prev,
        {
          ...data.data,
          image: postImage,
          isMyPost: true,
          createdAt: new Date(),
          authorDetails: {
            _id: user?._id,
            name: user?.name,
            profileImage: {
              path: user?.profileImage?.path,
            },
          },
        },
      ]);

      setNewPost("");
      setPostImage(null);

      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= TOGGLE COMMENT ================= */
  const toggleComment = (postId) => {
    setPosts((prev) =>
      prev.map((p) => ({
        ...p,
        isShowComment: p._id === postId ? !p.isShowComment : false,
      }))
    );
  };

  /* ================= JSX ================= */
  return (
    <>
      <div
        ref={scrollRef}
        className="community-feed"
        onScroll={handleScroll}
      >
        {posts.map((post, k) => (
          <CommunitypostChatCard
            key={post._id+k}
            data={post}
            hideComment={toggleComment}
          />
        ))}
      </div>

      {/* INPUT */}
      <form className="community-input-bar" onSubmit={handleSubmit}>
        {postImage?.path && (
          <div className="image-preview">
            <img src={postImage.path} />
            <button type="button" onClick={() => setPostImage(null)}>
              ✕
            </button>
          </div>
        )}

        <div className="input-row">
          <input
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a comment..."
          />

          <ImageFormik
            isHidePreview
            name="coverImage"
            action={setPostImage}
          >
            {(f, hc, ref) => (
              <>
                <input
                  ref={ref}
                  type="file"
                  className="d-none"
                  onChange={hc}
                />
                <button type="button" className="transparent-btn" onClick={() => ref.current.click()}>
                  📎
                </button>
              </>
            )}
          </ImageFormik>

          <button type="submit" className="send-btn">
            ➤
          </button>
        </div>
      </form>
    </>
  );
};

export default CommunityCommentList;
