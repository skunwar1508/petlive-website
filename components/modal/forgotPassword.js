"use client";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import common from "@/services/common";
import UnauthAxios from "@/services/unauthAxios";
import { ErrorMessage } from "../formik/errorMessage";
import { useAppContext } from "@/context/context";


const ForgotPasswordModal = ({ show, onHide }) => {
    const { securityQuestions, setShowLogin, setShowForgotPassword } = useAppContext();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const initialValues = {
        emailOrPhone: "",
        securityQuestion: "",
        securityAnswer: "",
        newPassword: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        emailOrPhone: Yup.string().required("Email or phone is required"),
        securityQuestion: Yup.string().required("Security question is required"),
        securityAnswer: Yup.string().required("Security answer is required"),
        newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm password is required"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            setSubmitting(true);
            const { data } = await UnauthAxios.post("/patient/web/forget", values);
            common.success(data?.message || "Password reset successfully");
            setSubmitted(true);
            resetForm();
            setShowForgotPassword(false);
            setShowLogin(true);
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

    return (
        <Modal show={show} onHide={onHide} centered contentClassName="form-modal forgot-password-modal">
            <Modal.Body>
                <h3 className="text-center modal-title">Forgot Password</h3>
                {submitted ? (
                    <div className="text-center my-4">
                        <p className="mb-0">If your account exists, your password has been reset.</p>
                    </div>
                ) : (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control modal-input"
                                placeholder="Email or Mobile Number"
                                {...formik.getFieldProps("emailOrPhone")}
                            />
                            <ErrorMessage name="emailOrPhone" formik={formik} />
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-control form-select modal-input"
                                name="securityQuestion"
                                value={formik.values.securityQuestion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Select Security Question</option>
                                {securityQuestions.map((question, idx) => (
                                    <option key={idx} value={question}>
                                        {question}
                                    </option>
                                ))}
                            </select>
                            <ErrorMessage name="securityQuestion" formik={formik} />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control modal-input"
                                placeholder="Security Answer"
                                {...formik.getFieldProps("securityAnswer")}
                            />
                            <ErrorMessage name="securityAnswer" formik={formik} />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control modal-input"
                                placeholder="New Password"
                                {...formik.getFieldProps("newPassword")}
                            />
                            <ErrorMessage name="newPassword" formik={formik} />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control modal-input"
                                placeholder="Confirm Password"
                                {...formik.getFieldProps("confirmPassword")}
                            />
                            <ErrorMessage name="confirmPassword" formik={formik} />
                        </div>
                        <button
                            type="submit"
                            className="btn modal-btn w-100"
                            disabled={submitting || formik.isSubmitting}
                        >
                            {submitting || formik.isSubmitting ? "Submitting..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ForgotPasswordModal;