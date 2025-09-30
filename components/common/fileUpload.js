import React, { use, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import common from "../../services/common";
import authAxios from "../../services/authAxios";
import { useAppContext } from "@/context/context";

const ImageFormik = ({ children, action, name, setPreview, data, accepts, isHidePreview, minWidth, maxWidth }) => {
    const { setIsLoading } = useAppContext();
    const fileInputRef = useRef();
    const [file, setFile] = useState(null);
    const [currentData , setCurrentData] = useState(data);
    const extensions = ["image/jpg", "image/jpeg", "image/png"];

    const [validationSchema, setValidationSchema] = useState(
        Yup.object().shape({
            userImage: common.imageValidate({ extention: extensions }),
        })
    );
    useEffect(() => {
        if (data) {
            setCurrentData(data);
        }
    }, [data]);
    const revalidate = (accepts, minWidth, maxWidth) => {
        if (accepts?.length > 0) {
            let newAccepts = [...accepts, ...extensions];
            return Yup.object().shape({
                userImage: common.imageValidate({ extention: newAccepts, minWidth: minWidth, maxWidth: maxWidth }),
            });
        } else {
            return Yup.object().shape({
                userImage: common.imageValidate({ extention: extensions, minWidth: minWidth, maxWidth: maxWidth }),
            });
        }
    };

    useEffect(() => {
        if (accepts?.length > 0 || minWidth || maxWidth) {
            setValidationSchema(revalidate(accepts, minWidth, maxWidth));
        }
    }, [accepts, minWidth, maxWidth]);

    const formik = useFormik({
        initialValues: {
            userImage: null,
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => { },
    });


    const submitForm = async (imageFile) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('coverImage', imageFile)
            let url = "/media/upload";
            const { data } = await authAxios({
                url: url,
                method: "POST",
                data: formData,
            });
            formik.resetForm();
            setFile(data?.data);
            toast.success(data?.message);
            action && action(data?.data);
            setCurrentData(data?.data);
            setPreview && setPreview(imageFile)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            common.error(error)
        }
    };
    const handleImageChange = async (e) => {
        const imageFile = e?.target?.files[0];

        await formik.setFieldValue("userImage", imageFile);

        const isError = await formik.validateForm();
        if (!isError?.userImage) {
            await submitForm(imageFile);
            // formik.handleSubmit();
        } else {
            toast.error(isError?.userImage);
            formik.setFieldTouched("userImage", true);
            formik.resetForm();
            formik.setFieldValue(name, "");
        }
        if (fileInputRef.current) {
            // fileInputRef.current.value = '';
        }
    };



    return (
        <>
            {/* <input type="file" onChange={(e: any) => handleImageChange(e)} /> */}
            <div className='inputPrivewWrp d-flex gap-2 align-items-center'>
                {!isHidePreview && (
                    <div className='previewIMGorPDF'>
                        {((currentData?.type == "image/jpg" || currentData?.type == "image/jpeg" || currentData?.type == "image/png") || (file?.type == "image/jpg" || file?.type == "image/jpeg" || file?.type == "image/png")) ? <a href={currentData?.path || file?.path} target='_blank'><img src={currentData?.path || file?.path} alt="licence img" className='img-fluid' /></a> : (
                            (currentData?.type == "application/pdf" || file?.type == "application/pdf") && <a href={currentData?.path || file?.path} target='_blank'><img src="/assets/images/pdf-icon.png" alt="licence pdf" className='img-fluid' /></a>
                        )}
                    </div>
                )}
                {children && (
                    children(formik, handleImageChange, fileInputRef)
                )}
            </div>
        </>
    );
};

export default ImageFormik;



const PreviewImage = ({ src, className, apiSrc }) => {

    return (
        <>
            {src ? (
                <img src={common.previewURL(src) || '/assets/images/user.png'} className={className ? className : 'proImage'} />
            ) : (
                <img src={apiSrc?.path || '/assets/images/user.png'} className={className ? className : 'proImage'} />
            )}


        </>
    )
}
export { PreviewImage }