"use client";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import common from "@/services/common";
import UnauthAxios from "@/services/unauthAxios";
import { ErrorMessage } from "../formik/errorMessage";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/router";

const LoginModal = ({ show, onHide }) => {
  const [otpSent, setOtpSent] = useState(false);
  const { login, setShowRegister } = useAppContext();
  const router = useRouter();

  const initialValues = {
    phone: "",
    otp: "",
    isAccept: true,
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    otp: Yup.string().length(4, "OTP must be 4 digits"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (otpSent && values.otp) {
        const { data } = await UnauthAxios.post("/patient/login/verify", {
          phone: values.phone,
          otp: values.otp,
        });
        common.success(data?.message || "Login successful");
        localStorage.setItem("token", data?.data?.token);
        login(data?.data);
        setOtpSent(false);
        resetForm();
        onHide();
        router.reload();
      } else {
        const { data } = await UnauthAxios.post("/patient/login", {
          phone: values.phone,
          isAccept: values.isAccept,
        });
        setOtpSent(true);
        formik.setFieldValue("otp", data?.data);
        common.success(data?.message || "OTP sent");
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
      await formik.submitForm();
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
        <h3 className="text-center modal-title">Login</h3>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control modal-input"
              placeholder="Mobile Number"
              {...formik.getFieldProps("phone")}
            />
            <ErrorMessage name="phone" formik={formik} />
          </div>
          {otpSent && (
            <>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control modal-input"
                  placeholder="Enter OTP"
                  {...formik.getFieldProps("otp")}
                />
                <ErrorMessage name="otp" formik={formik} />
              </div>

              <div className="d-flex justify-content-end mb-3">
                <Link href="#" className="resend-link" onClick={handleResendOTP}>
                  Resend OTP
                </Link>
              </div>
            </>
          )}
          <button type="submit" className="btn modal-btn w-100">
            Submit
          </button>


          <div className="text-center mt-3">
            <p className="mb-0">
              Don't have an account?
              <a onClick={()=>{
                onHide();
                setShowRegister(true);
              }} className="ms-2 register-link cursor-pointer">
                Register now
              </a>
            </p>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
