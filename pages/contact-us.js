import Head from "next/head";
import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import UnauthAxios from "@/services/unauthAxios";
import { useFormik } from "formik";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

/**
 * If you have an authAxios service, replace `axiosInstance` with your import:
 * import authAxios from "@/services/authAxios";
 * and use authAxios.post(...) in handleSubmit.
 */

const ContactUs = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
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
      const res = await UnauthAxios.post("/contact/create", values, {
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const metaTags = {
    title: "Contact Furr Baby for Support & Pet Care Assistance",
    description: "Reach out to Furr Baby for queries, support, or pet care assistance. Our team is here to help you with community, services, and general information.",
    keywords: "pet community, dog lovers, cat lovers, pet care, pet health, pet tips, furr baby",
    ogUrl: "https://www.furrbaby.in/",
    ogType: "website",
    ogTitle: "Contact Furr Baby for Support & Pet Care Assistance",
    ogDescription: "Reach out to Furr Baby for queries, support, or pet care assistance. Our team is here to help you with community, services, and general information.",
    ogImage: "https://www.furrbaby.in/furr_baby_logo.svg",
    twitterCard: "summary_large_image",
    twitterDomain: "www.furrbaby.in",
    twitterUrl: "https://www.furrbaby.in/",
    twitterTitle: "Contact Furr Baby for Support & Pet Care Assistance",
    twitterDescription: "Reach out to Furr Baby for queries, support, or pet care assistance. Our team is here to help you with community, services, and general information.",
    twitterImage: "https://www.furrbaby.in/furr_baby_logo.svg",
  };

  return (
    <>
      <Head>
        <title>{metaTags.title}</title>
        <meta name="title" content={metaTags.title} />
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content={metaTags.ogUrl} />
        <meta property="og:type" content={metaTags.ogType} />
        <meta property="og:title" content={metaTags.ogTitle} />
        <meta property="og:description" content={metaTags.ogDescription} />
        <meta property="og:image" content={metaTags.ogImage} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={metaTags.twitterCard} />
        <meta property="twitter:domain" content={metaTags.twitterDomain} />
        <meta property="twitter:url" content={metaTags.twitterUrl} />
        <meta name="twitter:title" content={metaTags.twitterTitle} />
        <meta name="twitter:description" content={metaTags.twitterDescription} />
        <meta name="twitter:image" content={metaTags.twitterImage} />
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
              <form noValidate onSubmit={formik.handleSubmit}>
                {/* Name */}
                <div className=" mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="modal-input form-control"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="errorMsg">{formik.errors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div className=" mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="modal-input form-control"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="errorMsg">{formik.errors.email}</div>
                  )}
                </div>

                {/* Phone */}
                <div className=" phone-code-bar mb-3">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Mobile Number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="modal-input form-control"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="errorMsg">{formik.errors.phone}</div>
                  )}
                </div>

                {/* Message */}
                <div className=" mb-4">
                  <textarea
                    rows={6}
                    name="message"
                    placeholder="Reason"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="modal-input form-control"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="errorMsg">{formik.errors.message}</div>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="cta-btn w-100"
                  >
                    {formik.isSubmitting ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
