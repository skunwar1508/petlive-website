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
  const { login, setShowRegister, setShowLogin, securityQuestions } = useAppContext();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    securityQuestion: "",
    securityAnswer: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    securityQuestion: Yup.string().required("Security question is required"),
    securityAnswer: Yup.string().required("Security answer is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { data } = await UnauthAxios.post("/patient/web/signup", values);
      common.success(data?.message || "Registration successful");
      localStorage.setItem("token", data?.data?.token);
      login(data?.data);
      resetForm();
      onHide();
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
    <Modal show={show} onHide={onHide} centered size="lg" contentClassName="form-modal login-modal">
      <Modal.Body>
        <h3 className="text-center modal-title">Register</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="mb-3 col-12 col-md-6">
              <input
                type="text"
                className="form-control modal-input"
                placeholder="Your Name"
                name="name"
                {...formik.getFieldProps("name")}
              />
              <ErrorMessage name="name" formik={formik} />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <input
                type="text"
                className="form-control modal-input"
                placeholder="Phone Number"
                name="phone"
                {...formik.getFieldProps("phone")}
              />
              <ErrorMessage name="phone" formik={formik} />
            </div>
            <div className="mb-3 col-12 col-md-12">
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
            <div className="mb-3 col-12 col-md-6">
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
            <div className="mb-3 col-12 col-md-6">
              <input
                type="text"
                className="form-control modal-input"
                placeholder="Security Answer"
                name="securityAnswer"
                {...formik.getFieldProps("securityAnswer")}
              />
              <ErrorMessage name="securityAnswer" formik={formik} />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <input
                type="password"
                className="form-control modal-input"
                placeholder="Password"
                name="password"
                {...formik.getFieldProps("password")}
              />
              <ErrorMessage name="password" formik={formik} />
            </div>
            <div className="mb-3 col-12 col-md-6">
              <input
                type="password"
                className="form-control modal-input"
                placeholder="Confirm Password"
                name="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
              />
              <ErrorMessage name="confirmPassword" formik={formik} />
            </div>
          </div>
          <button
            type="submit"
            className="btn modal-btn w-100"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
          <div className="text-center mt-3">
            <p className="mb-0">
              Already have an account?
              <a
                onClick={(e) => {
                  onHide();
                  setShowLogin(true);
                }}
                className="ms-2 register-link cursor-pointer"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
