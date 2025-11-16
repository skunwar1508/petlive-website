"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";
import VerifyModal from "./modal/VerifyModal";
import { useAppContext } from "@/context/context";
import AskLoginModal from "./modal/askLoginModel";

const Header = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const { user, logout, isLoggedIn, showLogin, setShowLogin, showRegister, setShowRegister, showAskLogin, setShowAskLogin } = useAppContext();

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

  // single config array, then derive menuItems from it
  const menuConfig = [

    // auth-only
    { name: "Community", href: "/community" },
    { name: "Blogs", href: "/blogs" },
    { name: "Profile", href: "/profile", show: "auth" },
    // guest-only
    { name: "Login", href: "#", show: "guest", actionKey: "login" },
    { name: "Register", href: "#", show: "guest", actionKey: "register" },

    // logout action for authenticated users
    { name: "Logout", href: "#", show: "auth", actionKey: "logout" },
  ];

  // map action keys to actual functions that use context setters
  const actionHandlers = {
    login: () => setShowLogin(true),
    register: () => setShowRegister(true),
    logout: () => logout(),
  };

  // derive visible menu items based on auth and role
  const menuItems = menuConfig
    .filter((item) => {
      if (item.show === "guest") return !isLoggedIn;
      if (item.show === "auth") return isLoggedIn;
      return true;
    })
    .filter((item) => {
      // if roles are specified, ensure user has one of them
      if (item.roles && item.roles.length > 0) {
        return !!user && item.roles.includes(user?.role);
      }
      return true;
    })
    .map((item) => ({
      ...item,
      // attach real action function if actionKey present
      action: item.actionKey ? actionHandlers[item.actionKey] : undefined,
    }));

  // helper renderer for menu items (desktop & mobile share logic)
  const renderMenuItem = (item, isMobile = false) => {
    const key = item.name;
    // action-driven items (modals, logout)
    if (item.action) {
      return (
        <li key={key}>
          <Link
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              item.action();
              setOpen(false);
            }}
          >
            {item.name}
          </Link>
        </li>
      );
    }

    // normal navigation links
    return (
      <li key={key}>
        <Link
          href={item.href}
          className="nav-link"
          onClick={(e) => {
            // desktop uses handler that just closes menu, mobile also closes
            handleNavigateAndClose(e, item.href);
            if (isMobile) setOpen(false);
          }}
        >
          {item.name}
        </Link>
      </li>
    );
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
            {isLoggedIn && (
              <li className="user-welcome">
                <div className="user-info">
                  <span>Welcome, {user?.name}</span>
                </div>
              </li>
            )}

            {menuItems.map((item) => renderMenuItem(item, false))}
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
              {isLoggedIn && (
                <li className="user-welcome">
                  <div className="user-info">
                    <span>Welcome, {user?.name}</span>
                  </div>
                </li>
              )}

              {menuItems.map((item) => {
                // Mobile-specific rendering to ensure sidebar closes
                if (item.action) {
                  return (
                    <li key={item.name}>
                      <Link
                        href="#"
                        className="nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          item.action();
                          setOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="nav-link"
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
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
      <AskLoginModal show={showAskLogin} onHide={() => setShowAskLogin(false)} />
      {/* <VerifyModal show={showVerify} onHide={() => setShowVerify(false)} /> */}
    </header>
  );
};

export default Header;
