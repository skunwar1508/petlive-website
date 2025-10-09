import Head from "next/head";
import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

/**
 * If you have an authAxios service, replace `axiosInstance` with your import:
 * import authAxios from "@/services/authAxios";
 * and use authAxios.post(...) in handleSubmit.
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // set in env if needed
  headers: {
    "Content-Type": "application/json",
  },
});

const ContactUs = () => {
  const initialValues = {
    name: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    countryCode: Yup.string().required("Country Code is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Only digits are allowed")
      .test("valid-phone-number", function (value) {
        const { countryCode } = this.parent;
        if (!value) return false;

        if (countryCode === "+91") {
          if (/^\d{10}$/.test(value)) return true;
          return this.createError({
            message: "Indian mobile number must be 10 digits",
          });
        }
        if (countryCode === "+971") {
          if (/^\d{9}$/.test(value)) return true;
          return this.createError({
            message:
              "UAE mobile number must be exactly 9 digits, without 0 at the start",
          });
        }
        if (/^\d{5,12}$/.test(value)) return true;
        return this.createError({
          message: "Phone number must be 5-12 digits",
        });
      }),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // If you have authAxios, replace axiosInstance with authAxios
      const res = await axiosInstance.post("/connect/contact-us", values, {
        // Add any headers if needed
      });

      const message = res?.data?.message || "Request submitted successfully";
      toast.success(message);
      resetForm();
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        "Something went wrong, please try again";
      toast.error(errMsg);
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact Furr Baby for support or queries"
        />
      </Head>

      <section className="page-section  text-page-ui py-5">
        <div className="container">
          <h1 className="heading-secondary mb-5">Contact Us</h1>

          <div
            className="contact-us-box text-start"
            style={{
              display: "flex",
              gap: 24,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div className="contact-us-col" style={{ flex: "1 1 300px" }}>
              <img
                src="/images/blog-dog.png"
                alt="contact"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            <div className="contact-us-form" style={{ flex: "1 1 300px" }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <FormikForm noValidate>
                    {/* Name */}
                    <div className=" mb-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="modal-input form-control"
                      />
                      {touched.name && errors.name && (
                        <div className="errorMsg">{errors.name}</div>
                      )}
                    </div>

                    {/* Email */}
                    <div className=" mb-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="modal-input form-control"
                      />
                      {touched.email && errors.email && (
                        <div className="errorMsg">{errors.email}</div>
                      )}
                    </div>

                    {/* Phone */}
                    <div className=" phone-code-bar mb-3">
                      <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="modal-input form-control"
                      />
                      {/* <PhoneInput
                        country={"in"}
                        value={values.countryCode + values.phoneNumber}
                        countryCodeEditable={false}
                        onChange={(phone, countryData) => {
                          const dialCode = countryData?.dialCode || "91";
                          // remove dialCode from start of phone string if present
                          let local = phone;
                          const dialStr = String(dialCode);
                          // phone may contain leading + or not, normalize
                          local = local.replace(/\+/g, "");
                          if (local.startsWith(dialStr)) {
                            local = local.slice(dialStr.length);
                          }
                          // remove any non-digit chars
                          local = local.replace(/\D/g, "");
                          setFieldValue("phoneNumber", local);
                          setFieldValue("countryCode", `+${dialStr}`);
                        }}
                        onBlur={() => {}}
                        inputProps={{
                          name: "phone",
                          required: true,
                          className: "modal-input form-control",
                        }}
                        inputClass="w-100"
                      /> */}
                      {touched.phoneNumber && errors.phoneNumber && (
                        <div className="errorMsg">{errors.phoneNumber}</div>
                      )}
                      {/* Hidden fields to keep Formik state in sync (optional) */}
                      {/* <input
                        type="hidden"
                        name="countryCode"
                        value={values.countryCode}
                      />
                      <input
                        type="hidden"
                        name="phoneNumber"
                        value={values.phoneNumber}
                      /> */}
                    </div>

                    {/* Message */}
                    <div className=" mb-4">
                      <textarea
                        rows={6}
                        name="message"
                        placeholder="Reason"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="modal-input form-control"
                      />
                      {touched.message && errors.message && (
                        <div className="errorMsg">{errors.message}</div>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cta-btn w-100"
                      >
                        {isSubmitting ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
