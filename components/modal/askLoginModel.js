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

const AskLoginModal = ({ show, onHide }) => {
    const { setShowRegister, setShowLogin } = useAppContext();

    const handleRegister = () => {
        onHide();
        setShowRegister(true);
    };

    const handleLogin = () => {
        onHide();
        setShowLogin(true);
    };

    return (
        <Modal show={show} onHide={onHide} centered contentClassName="form-modal register-modal">
            <Modal.Body>
                <h3 className="text-center modal-title">Join the FurrBaby Community</h3>
                <p className="text-center modal-subtitle">
                    Create your account to access all pet communities, share posts, and connect with other pet parents.
                </p>

                <div className="d-grid gap-2">
                    <button type="button" className="btn modal-btn " onClick={handleRegister}>
                        ⭐ Register
                    </button>
                </div>

                <div className="text-center mt-3">
                    <p className="mb-0">
                        Already have an account?
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                            className="ms-2 register-link cursor-pointer"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AskLoginModal;
