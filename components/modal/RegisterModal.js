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

const RegisterModal = ({ show, onHide }) => {
  const [otpSent, setOtpSent] = useState(false);
  const { login, setShowRegister } = useAppContext();

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
    <Modal show={show} onHide={onHide} centered contentClassName="form-modal login-modal">
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
        <h3 className="text-center modal-title">Register</h3>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control modal-input"
              placeholder="Your Name"
              name="name"
              {...formik.getFieldProps("name")}
            />
            <ErrorMessage name="name" formik={formik} />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control modal-input"
              placeholder="Phone Number"
              name="phone"
              {...formik.getFieldProps("phone")}
            />
            <ErrorMessage name="phone" formik={formik} />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control modal-input"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage name="email" formik={formik} />
          </div>
          {otpSent && (
            <>
              <div className="d-flex justify-content-end mb-1">
                <a onClick={() => handleResendOTP()} className="resend-link">
                  Resend OTP
                </a>
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  className="form-control modal-input"
                  placeholder="Enter OTP"
                  name="otp"
                  {...formik.getFieldProps("otp")}
                />
                <ErrorMessage name="otp" formik={formik} />
              </div>
            </>
          )}

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
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
