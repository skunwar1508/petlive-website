"use client";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import UnauthAxios from "@/services/unauthAxios";
import { ErrorMessage } from "../formik/errorMessage";
import common from "@/services/common";
import { useAppContext } from "@/context/context";

const AskVetModel = ({ show, onHide }) => {
    const [otpSent, setOtpSent] = useState(false);
    const { login, setShowRegister, setShowLogin } = useAppContext();

    const initialValues = {
        name: "",
        phone: "",
        email: "",
        otp: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
            .required("Phone is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        otp: Yup.string().length(4, "OTP must be 4 digits"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (values?.otp) {
                const { data } = await UnauthAxios.post(
                    "/patient/signup/web/verify",
                    values
                );
                console.log("data", data);
                common.success(data?.message || "Registration successful");
                localStorage.setItem("token", data?.data?.token);
                login(data?.data);
                setOtpSent(false);
                resetForm();
                onHide();
            } else {
                const { data } = await UnauthAxios.post("/patient/signup/web", values);
                setOtpSent(true);
                formik.setFieldValue("otp", data?.data?.otpCode);
                common.success(data?.message);
            }
        } catch (error) {
            common.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handleResendOTP = async () => {
        try {
            formik.setFieldValue("otp", "");
            formik.submitForm();
        } catch (error) {
            common.error(error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="xl" centered contentClassName="form-modal famous-section bg-paw-img askvet-modal p-5">
            <span className="third-bg"></span>
            <Modal.Body>
                {/* Logo */}
                {/* <div className="text-center mb-3">
          <img
            src="/furr_baby_logo.svg"
            alt="Furr Baby"
            className="modal-logo"
          />
        </div> */}

                {/* Title */}
                <div className="text-center askvet-header mb-5">
                    <h3 className="modal-title text-theme mb-2">Have a question about your pet’s health or behaviour?</h3>
                    <p className="text-theme mb-0">Share it with us — our team will connect you with a vet.</p>
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit}>
                    <div className="askvet-modal-form">
                        <div className="mb-5">
                            <div className="pettypegroup text-center">
                                <h4 className="text-theme mb-3">Pet Type</h4>
                                <div className="petlebelgroup">
                                    <label className="pettypelabel">
                                        <input type="radio" name="petType" value="Dog" />
                                        <span>Dog</span>
                                    </label>
                                    <label className="pettypelabel">
                                        <input type="radio" name="petType" value="Cat" />
                                        <span>Cat</span>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control modal-input"
                                placeholder="Pet’s Name"
                                name="name"
                                {...formik.getFieldProps("name")}
                            />
                            <ErrorMessage name="name" formik={formik} />
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control modal-input"
                                placeholder="Issue"
                                name="issue"
                                {...formik.getFieldProps("issue")}
                            />
                            <ErrorMessage name="issue" formik={formik} />
                        </div>
                        <button
                            type="submit"
                            className="btn modal-btn w-100"
                            disabled={
                                formik.isSubmitting ||
                                (otpSent && formik.values?.otp?.length !== 4)
                            }
                        >
                            Submit
                        </button>
                    </div>
                    <div className="text-center footText-model mt-5">
                        <p className="mb-0">
                            * This is not a medical consultation. For emergencies, please visit your nearest veterinary clinic immediately.
                        </p>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AskVetModel;
