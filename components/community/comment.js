import React, { Fragment, use, useEffect, useState } from 'react'
import authAxios from '../../services/authAxios';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react/dist/iconify.js';
import Moment from 'react-moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const CommentBox = ({ data, setActiveReply, currentReply, action, isChildReply, viewComments, setViewComments }) => {
    const [isReply, setIsReply] = useState(false);
    useEffect(() => {
        if (currentReply === data._id) {
            setIsReply(true);
        } else {
            setIsReply(false);
        }
        replyFormik.setFieldValue('commentObjId', data._id);
    }, [currentReply]);






    const replyFormik = useFormik({
        initialValues: {
            reply: '',
            commentObjId: "",
        },
        validationSchema: Yup.object({
            reply: Yup.string().required('Please enter the comment'),
        }),
        onSubmit: (values) => {
            submitReply(values)
        },
    });

    const submitReply = async (values) => {
        authAxios.post('/article/comment/reply/add', values)
            .then((response) => {
                toast.success(response?.data?.message || 'Reply submitted successfully');
                replyFormik.resetForm();
                setIsReply(false);
                action();
            })
            .catch((error) => {
                toast.error("Failed to submit reply");
                console.error(error);
            });
    }


    return (
        <>
            <div className='aritcleCommentListBody mb-3'>
                <div className='aritcleUseImg'>
                    {!isChildReply && <img className='img-fluid' src={data?.senderId?.profileImage?.path || '/assets/images/user.png'} alt='#' />}
                    {isChildReply && data?.replies?.role == 'doctor' ? (
                        <img className='img-fluid' src={data?.doctorId?.profileImage?.path || '/assets/images/user.png'} alt='#' />
                    ) : (
                        <img className='img-fluid' src={data?.patientId?.profileImage?.path || '/assets/images/user.png'} alt='#' />
                    )}

                </div>
                <div className='aritcleCommentContent'>
                    {isChildReply ? (
                        <Fragment>
                            {data?.doctorId?.firstName && <h4>{data?.doctorId?.firstName + ' ' + data?.doctorId?.lastName || 'Anonymous'}</h4>}
                            {data?.patientId?.fullName && <h4>{data?.patientId?.fullName || 'Anonymous'}</h4>}
                            <p>{data?.reply}</p>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {data?.senderRole == 'doctor' ? (
                                <h4>{data?.senderId?.firstName + ' ' + data?.senderId?.lastName || 'Anonymous'}</h4>
                            ) : (
                                <h4>{data?.senderId?.fullName || 'Anonymous'}</h4>
                            )}

                            <p>{data?.comment}</p>
                        </Fragment>
                    )}

                    {isReply && (
                        <form onSubmit={replyFormik.handleSubmit} className='patientWritMsgBx mb-3'>
                            <input {...replyFormik.getFieldProps('reply')} className='form-control' type='text' placeholder='Write here...' />
                            <button type='submit' className='btn sendbtn'><Icon icon="material-symbols:send-outline" /></button>
                        </form>
                    )}
                    {/* ? (
                        <a className='replyComment' onClick={() => setIsReply(false)}>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18" stroke="#019889" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6L18 18" stroke="#019889" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Cancel
                        </a>
                    ) : */}
                    {!isChildReply && !isReply && (
                        <div className='d-flex gap-3 mb-3 justify-content-between position-relative'>
                            {/* <a className='replyComment d-inline-block' onClick={() => setActiveReply(data._id)}>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.1263 6.16708C10.0587 6.10173 10.0047 6.02357 9.96761 5.93715C9.93049 5.85073 9.91095 5.75779 9.91013 5.66373C9.90931 5.56968 9.92724 5.47641 9.96285 5.38936C9.99847 5.30231 10.0511 5.22322 10.1176 5.15671C10.1841 5.09021 10.2632 5.03761 10.3502 5.00199C10.4373 4.96638 10.5305 4.94846 10.6246 4.94927C10.7186 4.95009 10.8116 4.96963 10.898 5.00675C10.9844 5.04388 11.0626 5.09784 11.1279 5.16549L14.6675 8.70999C14.8001 8.8428 14.8745 9.02278 14.8745 9.21043C14.8745 9.39808 14.8001 9.57806 14.6675 9.71087L11.1279 13.2511C11.0622 13.3169 10.9841 13.3691 10.8981 13.4048C10.8122 13.4404 10.7201 13.4588 10.627 13.4588C10.534 13.4588 10.4419 13.4405 10.3559 13.405C10.2699 13.3694 10.1918 13.3172 10.126 13.2515C10.0602 13.1857 10.008 13.1076 9.97234 13.0217C9.9367 12.9357 9.91834 12.8436 9.91831 12.7506C9.91828 12.6575 9.93657 12.5654 9.97214 12.4794C10.0077 12.3935 10.0599 12.3153 10.1256 12.2495L12.4596 9.91699H7.79168C6.31946 9.91698 4.90504 9.344 3.84789 8.31937C2.79074 7.29474 2.17386 5.89891 2.12785 4.42741L2.12502 4.25033C2.12502 4.06246 2.19965 3.8823 2.33248 3.74946C2.46532 3.61662 2.64549 3.54199 2.83335 3.54199C3.02121 3.54199 3.20138 3.61662 3.33422 3.74946C3.46706 3.8823 3.54168 4.06246 3.54168 4.25033C3.54164 5.34993 3.96779 6.40675 4.7306 7.19874C5.4934 7.99074 6.53348 8.45626 7.63231 8.49749L7.79168 8.50033H12.4568L10.1263 6.16708Z" fill="#019889" />
                                </svg>
                                Reply
                            </a> */}
                            <span className='commentTime'><Moment format="MMM DD, YYYY">{data?._createdAt}</Moment> </span>
                        </div>
                    )}

                    {viewComments == data?._id && data?.replies?.map((reply, index) => (
                        <CommentBox key={index} data={reply} isChildReply={true} />
                    ))}
                    {viewComments == data?._id ? (
                        <div className='d-flex gap-3 mt-3 justify-content-between position-relative'>
                            <a className='replyComment d-inline-block viewcommentbtn' onClick={() => setViewComments('')}>
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 12H20" stroke="#019889" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Hide Replies
                            </a>
                            <span className='commentTime'><Moment format="MMM DD, YYYY">{data?._createdAt}</Moment> </span>
                        </div>
                    ) : (
                        data?.replies?.length > 0 && (
                            <div className='d-flex gap-3 mb-3 justify-content-between position-relative'>
                                <a className='replyComment d-inline-block viewcommentbtn' onClick={() => setViewComments(data._id)}>
                                    View {data?.replies?.length} more replies
                                </a>
                            </div>
                        )
                    )}


                </div>
            </div>
        </>
    )
}
const Comment = ({ postId, hideComment }) => {
    // const { id } = useParams();

    const [commentList, setCommentList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [currentReply, setCurrentReply] = useState(null);
    const [viewComments, setViewComments] = useState(null);

    const fetchComments = (url, setData) => {
        setIsLoading(true);
        authAxios.get(url)
            .then((response) => {
                const newData = response?.data?.data || [];
                setData(newData);
            })
            .catch((error) => {
                // toast.error("Failed to fetch articles");
                console.error(error);
                setIsLoading(false);
            });
    };

    const getComments = (id) => {
        setIsLoading(true);
        fetchComments(`/community/post/${id}/getAll`, setCommentList);
    };

    useEffect(() => {
        setCommentList([]);
        getComments(postId);
    }, [postId]);




    const commentFormik = useFormik({
        initialValues: {
            comment: "",
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Please enter the comment'),
        }),
        onSubmit: (values) => {
            submitComment(values)
        },
    });


    const submitComment = async (values) => {
        authAxios.post(`/community/post/${postId}/comment`, values)
            .then((response) => {
                toast.success(response?.data?.message || 'Reply submitted successfully');
                commentFormik.resetForm();
                // setPage(1);
                setCommentList([]);
                getComments(postId);
            })
            .catch((error) => {
                toast.error("Failed to submit reply");
                console.error(error);
            });
    }
    return (
        <div className='commentsComntyWrp'>
            <div className='col-lg-12'>
                <div className='articleCommetList'>
                    <div className='articleCommentTitle'>
                        Comments
                    </div>
                    <div id="scrollableDivAll" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {commentList?.map((data, index) => (
                            <CommentBox key={index} data={data} action={() => {
                                setCommentList([]);
                                getComments(postId);
                            }} currentReply={currentReply} setActiveReply={(id) => setCurrentReply(id)}
                                viewComments={viewComments}
                                setViewComments={(id) => setViewComments(id)}
                            />
                        ))}
                    </div>

                </div>
            </div>
            {/* <div className='col-lg-12'>
                <div className='articleCommetList'>
                    <div className='aritcleCommentListBody'>
                        <div className='aritcleUseImg'>
                            <img className='img-fluid' src='assets/images/doctor.png' alt='#' />
                        </div>
                        <div className='aritcleCommentContent'>
                            <h4>Username</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>

                            <span className='commentTime'>Jun 10, 2021 </span>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='col-lg-12'>
                <form onSubmit={commentFormik.handleSubmit} className='patientWritMsgBx'>
                    <input {...commentFormik.getFieldProps('comment')} className='form-control' type='text' placeholder='Write here...' />
                    <button type='submit' className='btn sendbtn'><Icon icon="material-symbols:send-outline" /></button>
                </form>
            </div>
        </div>
    )
}

export default Comment