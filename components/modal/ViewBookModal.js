"use client";
import { Modal } from "react-bootstrap";
import { useState } from "react";

const ViewBookModal = ({ show, onHide }) => {
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
        <h3 className="text-center modal-title">Your Scrapbook Is Ready.</h3>

        {/* Form */}
        <form>
          <button type="submit" className="btn modal-btn w-100">
            View Book
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ViewBookModal;
