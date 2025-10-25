// import { Icon } from "@iconify/react/dist/iconify.js";
import CommunitypostChatCard from "./communityCommentChatCard";
import authAxios from "../../services/authAxios";
import ImageFormik from "../common/fileUpload";
import { useAppContext } from "@/context/context";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

const CommunitypostList = ({ id, communityDetails }) => {
  const { user } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [newpost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [pageData, setPageData] = useState({
    loading: false,
    page: 1,
    limit: 10,
    hasMore: true,
  });

  const scrollableDivRef = useRef(null);

  const fetchposts = useCallback(async () => {
    try {
      const { data } = await authAxios.post(`/community/post/${id}/paginate`, {
        page: pageData.page,
        perPage: pageData.limit,
      });
      let resData = data?.data?.reverse() || [];
      resData = resData.map((post) => {
        post.isShowComment = false;
        return post;
      });
      setPosts((prevposts) => [...resData, ...prevposts]);
      setPageData((prevPageData) => ({
        ...prevPageData,
        hasMore: data.data.length === pageData.limit,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [pageData.page, pageData.limit]);

  useEffect(() => {
    setPosts([]);
    setPageData({
      loading: false,
      page: 1,
      limit: 10,
      hasMore: true,
    });
  }, [id]);

  useEffect(() => {
    fetchposts();
  }, [fetchposts]);

  // useEffect(() => {
  //     socket.on('newpost', (post) => {
  //         setPosts((prevposts) => [post, ...prevposts]);
  //     });

  //     return () => {
  //         socket.off('newpost');
  //     };
  // }, [socket]);

  const handleScroll = async (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // if (scrollTop + clientHeight >= scrollHeight - 10 && pageData.hasMore && !pageData.loading) {
    //     setPageData((prevPageData) => ({
    //         ...prevPageData,
    //         page: prevPageData.page + 1,
    //         loading: true,
    //     }));
    // }
    if (scrollTop === 0 && pageData.hasMore) {
      setPageData((prevPageData) => ({
        ...prevPageData,
        page: prevPageData.page + 1,
        loading: true,
      }));
      scrollableDivRef.current.scrollTop = scrollTop + 100;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newpost.trim() || postImage?._id) {
      // socket.emit('addpost', { content: newpost });
      authAxios
        .post(`/community/post/${id}`, {
          content: newpost,
          image: postImage?._id || null,
        })
        .then((response) => {
          let post = response?.data?.data || {};
          post.image = postImage || null;
          post.createdAt = new Date();
          post.authorDetails = {
            firstName: user?.firstName || null,
            lastName: user?.lastName || null,
            _id: user?._id || null,
            profileImage: {
              path: user?.profileImage?.path || null,
            },
          };
          post.isMyPost = true;
          setPosts((prevposts) => [...prevposts, post]);
          setNewPost("");
          setPostImage(null);
          setTimeout(() => {
            scrollableDivRef.current.scrollTo({
              top: scrollableDivRef.current.scrollHeight,
              behavior: "smooth",
            });
          }, 300);
        })
        .catch((error) => {
          console.error("Error adding post:", error);
        });
      // setPosts((prevposts) => [{ content: newpost }, ...prevposts]);
    }
  };

  useEffect(() => {
    if (scrollableDivRef.current) {
      //  current scroll position
      const scrollTop = scrollableDivRef.current.scrollTop;
      const clientHeight = scrollableDivRef.current.clientHeight;
      const scrollHeight = scrollableDivRef.current.scrollHeight;
      // check if scroll position is at the bottom
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // scrollableDivRef.current.scrollTop = scrollHeight;
        scrollableDivRef.current.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      } else if (pageData?.page === 1) {
        scrollableDivRef.current.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      }
      // check if scroll position is at the top
      // if (scrollTop === 0) {
      //     scrollableDivRef.current.scrollTop = scrollTop + 100;
      // }
      // check if scroll position is at the bottom
      // if (scrollTop + clientHeight >= scrollHeight - 10) {
      //     scrollableDivRef.current.scrollTop = scrollHeight;
      // }
      // scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  }, [posts]);

  const getVisibleMessageIds = () => {
    if (scrollableDivRef.current) {
      const { scrollTop, clientHeight } = scrollableDivRef.current;
      const visibleMessages = [];
      const children = scrollableDivRef.current.children;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const rect = child.getBoundingClientRect();
        const parentRect = scrollableDivRef.current.getBoundingClientRect();

        if (rect.top >= parentRect.top && rect.bottom <= parentRect.bottom) {
          const messageId = posts[i]?._id; // Assuming each message has an `_id`
          const selfViews = posts[i]?.selfViews;
          const isMyPost = posts[i]?.isMyPost;
          if (messageId && !selfViews && !isMyPost) {
            visibleMessages.push(messageId);
          }
        }
      }

      return visibleMessages;
    }
    return [];
  };

  const postViews = (ids) => {
    authAxios
      .post(`/community/postviews`, ids)
      .then((response) => {
        setPosts((prevposts) => {
          return prevposts.map((post) => {
            if (ids?.postIds?.includes(post._id)) {
              return { ...post, selfViews: true };
            }
            return post;
          });
        });
      })
      .catch((error) => {
        console.error("Error updating post views:", error);
        // common.error(error);
      });
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      const visibleIds = getVisibleMessageIds();
      // Perform any action with the visible IDs
      if (visibleIds?.length > 0) {
        postViews({ postIds: visibleIds });
        // socket.emit('seenMessage', { messageIds: visibleIds });
      }
    };

    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScrollEvent);
    }

    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScrollEvent);
      }
    };
  }, []);

  const hideComment = (id) => {
    setPosts((prevposts) => {
      return prevposts.map((post) => {
        if (post._id === id) {
          post.isShowComment = !post.isShowComment;
        } else {
          post.isShowComment = false;
        }
        return post;
      });
    });
  };

  return (
    <>
      <div
        className="communitChatListBody"
        ref={scrollableDivRef}
        onScroll={handleScroll}
      >
        <h1 className="heading-secondary">
          {communityDetails?.name} ({communityDetails?.members?.length || 0}{" "}
          members)
        </h1>
        {posts.map((post) => (
          <CommunitypostChatCard
            key={post?._id}
            data={post}
            hideComment={(id) => hideComment(id)}
          />
        ))}
      </div>
      {/* <form className="patientWritMsgBx" onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Write here..."
                    value={newpost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <div className='uploadImgBtn'>
                    <ImageFormik isHidePreview={true} name="coverImage" action={(res) => {
                        setPostImage(res || null);
                    }}>
                        {(f, hc, ref) => (
                            <Fragment>
                                <input ref={ref} type="file" className="form-control" onChange={(e) => { hc(e); }} />

                            </Fragment>
                        )}
                    </ImageFormik>
                    {postImage?.path ? (
                        <img src={postImage?.path} alt='upload' className='img-fluid privew' />
                    ) : (
                        <img src='/assets/images/thumbnail-image.svg' alt='upload' className='img-fluid' />
                    )}
                    {postImage?.path && (
                        <Icon onClick={() => setPostImage(null)} className='deleteImg' icon="material-symbols:delete-outline" />
                    )}


                </div>
                <button className="btn sendbtn" type="submit">
                    <Icon icon="material-symbols:send-outline" />
                </button>
            </form> */}
      <form className="patientWritMsgBx" onSubmit={handleSubmit}>
        <div className="msgBox">
          <input
            type="text"
            className="form-control msg-input"
            placeholder="Write Comment Here..."
            value={newpost}
            onChange={(e) => setNewPost(e.target.value)}
          />

          {/* Upload (hidden input + label as icon button) */}
          <ImageFormik
            isHidePreview={true}
            name="coverImage"
            action={(res) => setPostImage(res || null)}
          >
            {(f, hc, ref) => (
              <>
                <input
                  id="commentUpload"
                  ref={ref}
                  type="file"
                  className="d-none"
                  onChange={(e) => hc(e)}
                />
                <label
                  htmlFor="commentUpload"
                  className="icon-btn upload"
                  title="Upload image"
                >
                  {/* <i className="material-symbols-outlined">upload</i> */}
                  <img src="/images/upload-icon.svg" alt="Upload" />
                </label>
              </>
            )}
          </ImageFormik>

          {/* Send */}
          <button className="icon-btn send" type="submit" aria-label="Send">
            {/* <i className="material-symbols-outlined">send</i> */}
            <img src="/images/send-icon.svg" alt="Send" />
          </button>
        </div>
      </form>
    </>
  );
};

export default CommunitypostList;
