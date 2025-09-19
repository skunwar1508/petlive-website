"use client";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";

const VerifyModal = ({ show, onHide }) => {
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
        <h3 className="text-center modal-title">Verify OTP</h3>

        {/* Form */}
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control modal-input"
              placeholder="Enter OTP"
            />
          </div>

          <button type="submit" className="btn modal-btn w-100">
            Verify OTP
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default VerifyModal;
