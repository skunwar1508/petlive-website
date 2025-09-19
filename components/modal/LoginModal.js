"use client";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";

const LoginModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered contentClassName="form-modal">
      <Modal.Body>
        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="/furr_baby_logo.svg"
            alt="Furr Baby"
            className="modal-logo"
          />
        </div>

        {/* Title */}
        <h3 className="text-center modal-title">Login</h3>

        {/* Form */}
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control modal-input"
              placeholder="Mobile Number"
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              className="form-control modal-input"
              placeholder="Enter OTP"
            />
          </div>
          <div className="d-flex justify-content-end mb-3">
            <Link href="#" className="resend-link">
              Resend OTP
            </Link>
          </div>
          <button type="submit" className="btn modal-btn w-100">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
