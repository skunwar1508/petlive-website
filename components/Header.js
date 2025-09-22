"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";
import VerifyModal from "./modal/VerifyModal";
import { useAppContext } from "@/context/context";

const Header = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { user, logout, isLoggedIn } = useAppContext();

  const navLinks = [
    { name: "Login", href: "#" },
    { name: "Register", href: "#" },
  ];

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // Handle click on nav link
  const handleNavClick = (link) => {
    if (link.name === "Login") {
      setShowLogin(true);
    }
    if (link.name === "Register") {
      setShowRegister(true);
    }
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-bar">
          {/* Logo */}
          <Link href="/" className="logo-link">
            <img className="logo" src="/furr_baby_logo.svg" alt="Furr Baby" />
          </Link>

          {/* Desktop Links */}
          <ul className="desktop-links">
            {isLoggedIn ? (
              <>
                <li>
                  <div className="user-info">
                    <span>Welcome, {user?.name}</span>
                  </div>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="nav-link"
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href="#"
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              )))}
          </ul>

          {/* Hamburger for Mobile */}
          <button
            className="mobile-toggle mobile-open"
            aria-expanded={"open"}
            aria-label={"Open menu"}
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>

        {/* Full-Width Sidebar for Mobile */}
        <div className={`mobile-sidebar ${open ? "open" : ""}`}>
          <div className="sidebar-content">
            {/* Close button */}
            <button
              className="mobile-toggle mobile-close"
              aria-expanded={"close"}
              aria-label={"Close menu"}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <img className="logo" src="/furr_baby_logo.svg" alt="Furr Baby" />
            <ul className="nav-links">
              {isLoggedIn ? (
                <>
                  <li>
                    <div className="user-info">
                      <span>Welcome, {user?.name}</span>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="nav-link"
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link);
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                )))}
            </ul>
          </div>
        </div>
      </div>
      {/* Modals */}
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      <RegisterModal
        show={showRegister}
        onHide={() => setShowRegister(false)}
      />
      {/* <VerifyModal show={showVerify} onHide={() => setShowVerify(false)} /> */}
    </header>
  );
};

export default Header;
