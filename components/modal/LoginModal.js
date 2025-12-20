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
  const { login, setShowLogin, setShowRegister, setShowForgotPassword } = useAppContext();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    emailOrPhone: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailOrPhone: Yup.string().required("Email or phone is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const { data } = await UnauthAxios.post("/patient/web/login", {
        emailOrPhone: values.emailOrPhone,
        password: values.password,
      });
      common.success(data?.message || "Login successful");
      localStorage.setItem("token", data?.data?.token);
      const token = data?.data?.token;
      if (token) {
        const maxAge = 7 * 24 * 60 * 60; // 7 days
        const secureFlag = typeof window !== "undefined" && window.location.protocol === "https:" ? "Secure; " : "";
        document.cookie = `token=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; ${secureFlag}SameSite=Lax`;
      }
      login(data?.data);
      resetForm();
      onHide();
      router.reload();
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
    <Modal show={show} onHide={onHide} centered contentClassName="form-modal login-modal">
      <Modal.Body>
        <h3 className="text-center modal-title">Login</h3>
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
            <input
              type="password"
              className="form-control modal-input"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <ErrorMessage name="password" formik={formik} />
            <div className="mt-2 text-end">
              <a  className="forgot-password-link"
                onClick={() => {
                  onHide();
                  setShowForgotPassword(true);
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button type="submit" className="btn modal-btn w-100" disabled={submitting || formik.isSubmitting}>
            {submitting || formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
          <div className="text-center mt-3">
            <p className="mb-0">
              Don't have an account?
              <a
                onClick={() => {
                  onHide();
                  setShowRegister(true);
                }}
                className="ms-2 register-link cursor-pointer"
              >
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
