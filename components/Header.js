"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";
import VerifyModal from "./modal/VerifyModal";
import { useAppContext } from "@/context/context";

const Header = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const { user, logout, isLoggedIn, showLogin, setShowLogin, showRegister, setShowRegister } = useAppContext();

  const pathname = usePathname(); // watch route changes

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

  // Close mobile menu when route changes (works with App Router)
  useEffect(() => {
    // close only if it was open (avoid unnecessary state updates)
    if (open) setOpen(false);
  }, [pathname]);

  // Handle click on nav link (for Login/Register)
  const handleNavClick = (link) => {
    if (link.name === "Login") {
      setShowLogin(true);
    }
    if (link.name === "Register") {
      setShowRegister(true);
    }
    setOpen(false);
  };

  // helper for normal navigation links to also close mobile menu
  const handleNavigateAndClose = (e, href) => {
    // allow Link to do its job — just close menu
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-bar">
          {/* Logo */}
          <Link href="/" className="logo-link" onClick={() => setOpen(false)}>
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
                  <Link
                    href="/community"
                    className="nav-link"
                    onClick={(e) => handleNavigateAndClose(e, "/community")}
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="nav-link"
                    onClick={(e) => handleNavigateAndClose(e, "/blogs")}
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="nav-link"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href="#"
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link);
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))
            )}
          </ul>

          {/* Hamburger for Mobile */}
          <button
            className="mobile-toggle mobile-open"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
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
              aria-expanded={!open}
              aria-label={"Close menu"}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <Link href="/" onClick={() => setOpen(false)}>
              <img className="logo" src="/furr_baby_logo.svg" alt="Furr Baby" />
            </Link>

            <ul className="nav-links">
              {isLoggedIn ? (
                <>
                  <li>
                    <div className="user-info">
                      <span>Welcome, {user?.name}</span>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/community"
                      className="nav-link"
                      onClick={() => setOpen(false)}
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blogs"
                      className="nav-link"
                      onClick={() => setOpen(false)}
                    >
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="nav-link"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link);
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))
              )}
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
