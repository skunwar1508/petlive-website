"use client";
"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "react-bootstrap";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";
import AskLoginModal from "./modal/askLoginModel";
import { useAppContext } from "@/context/context";
import ForgotPasswordModal from "./modal/forgotPassword";

/*
  Condensed Header component:
  - Preserves desktop (react-bootstrap Dropdown) + mobile collapsible menu
  - Consolidates repeated patterns for links/actions/children
  - Keeps accessibility attributes and route/modal behavior
*/

const Header = () => {
  const { breadcrumbs, isShowBreadcrumbs, user, logout, isLoggedIn, showLogin, setShowLogin, showRegister, setShowRegister, showAskLogin, setShowAskLogin, showForgotPassword, setShowForgotPassword } =
    useAppContext();
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuConfig = useMemo(
    () => [
      { name: "Community", href: "/community/list" },
      { name: "Blogs", href: "/blogs" },
      { name: "Login", href: "#", show: "guest", actionKey: "login" },
      { name: "Register", href: "#", show: "guest", actionKey: "register" },
      {
        name: "Profile",
        href: "#",
        show: "auth",
        children: [
          { name: () => `Welcome ${user?.name || ""}` },
          { name: "Logout", href: "#", actionKey: "logout" },
        ],
      },
    ],
    [user?.name]
  );

  const actionHandlers = useMemo(
    () => ({
      login: () => setShowLogin(true),
      register: () => setShowRegister(true),
      logout: () => logout(),
    }),
    [logout, setShowLogin, setShowRegister]
  );

  const menuItems = useMemo(
    () =>
      menuConfig
        .filter((it) => (it.show === "guest" ? !isLoggedIn : it.show === "auth" ? isLoggedIn : true))
        .map((it) => ({
          ...it,
          action: it.actionKey ? actionHandlers[it.actionKey] : undefined,
          children: it.children?.map((c) => ({ ...c, action: c.actionKey ? actionHandlers[c.actionKey] : undefined })),
        })),
    [menuConfig, isLoggedIn, actionHandlers]
  );

  useEffect(() => {
    const onResize = () => window.innerWidth > 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    const outside = (e) => !headerRef.current || headerRef.current.contains(e.target) || setOpenSubmenu(null);
    const onKey = (e) => e.key === "Escape" && (setOpen(false), setOpenSubmenu(null));
    document.addEventListener("mousedown", outside);
    document.addEventListener("touchstart", outside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("touchstart", outside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const navigate = useCallback(
    (href) => {
      if (!href || href === "#") return;
      router.push(href);
      setOpen(false);
      setOpenSubmenu(null);
    },
    [router]
  );

  const handleAction = useCallback(
    (action) => {
      if (typeof action === "function") action();
      setOpen(false);
      setOpenSubmenu(null);
    },
    []
  );

  const renderItem = (item, opts = { mobile: false }) => {
    const label = typeof item.name === "function" ? item.name() : item.name;
    const hasChildren = item.children?.length > 0;

    // top-level action/no children
    if (item.action && !hasChildren)
      return opts.mobile ? (
        <li key={label}>
          <button className="nav-link btn-as-link" onClick={() => handleAction(item.action)}>
            {label}
          </button>
        </li>
      ) : (
        <li key={label}>
          <button className="nav-link btn-as-link" onClick={() => handleAction(item.action)}>
            {label}
          </button>
        </li>
      );

    // items with children
    if (hasChildren) {
      const expanded = openSubmenu === item.name;
      if (!opts.mobile) {
        return (
          <li key={label} className={`has-children ${expanded ? "open" : ""}`}>
            <Dropdown show={expanded} onToggle={(isOpen) => setOpenSubmenu(isOpen ? item.name : null)}>
              <Dropdown.Toggle
                as="button"
                className="nav-link submenu-toggle"
                aria-haspopup="true"
                aria-expanded={expanded}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpenSubmenu(expanded ? null : item.name))}
              >
                {label}
              </Dropdown.Toggle>
              <Dropdown.Menu className="submenu desktop" aria-label={`${label} submenu`}>
                {item.children.map((c, i) =>
                  !c.href && !c.action ? (
                    <Dropdown.Header key={i} className="text-only">{typeof c.name === "function" ? c.name() : c.name}</Dropdown.Header>
                  ) : c.action ? (
                    <Dropdown.Item key={i} as="button" onClick={() => handleAction(c.action)}>{typeof c.name === "function" ? c.name() : c.name}</Dropdown.Item>
                  ) : (
                    <Dropdown.Item key={i} onClick={() => navigate(c.href)}>{typeof c.name === "function" ? c.name() : c.name}</Dropdown.Item>
                  )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        );
      }

      // mobile submenu
      // Mobile: don't show a collapsible submenu for Profile — render only actionable children (e.g. Logout)
      return (
        <React.Fragment key={label}>
          {item.children
            .filter((c) => typeof c.action === "function" || c.href) // drop text-only entries like welcome
            .map((c, i) => (
              <li key={`${label}-child-${i}`}>
                {c.action ? (
                  <button className="nav-link btn-as-link" onClick={() => handleAction(c.action)}>
                    {typeof c.name === "function" ? c.name() : c.name}
                  </button>
                ) : (
                  <button className="nav-link btn-as-link" onClick={() => navigate(c.href)}>
                    {typeof c.name === "function" ? c.name() : c.name}
                  </button>
                )}
              </li>
            ))}
        </React.Fragment>
      );
    }

    // normal link
    return opts.mobile ? (
      <li key={label}>
        <button className="nav-link btn-as-link" onClick={() => navigate(item.href)}>
          {label}
        </button>
      </li>
    ) : (
      <li key={label}>
        <button className="nav-link btn-as-link" onClick={() => navigate(item.href)}>
          {label}
        </button>
      </li>
    );
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container">
        <div className="header-bar">

          {isShowBreadcrumbs && breadcrumbs && breadcrumbs.title ? (
            <div className="header-breadcrumbs" aria-label="Page location">
              <button onClick={() => window.history.back()} className="back-btn">
                ←
              </button>

              <div className="header-info">
                <h1>{breadcrumbs.title}</h1>
                <p>{breadcrumbs.description}</p>
              </div>
            </div>
          ) : (
            <Link href="/" className="logo-link" onClick={() => setOpen(false)}>
              <img className="logo" src="/furr_baby_logo.svg" alt="Furr Baby" />
            </Link>
          )}

          <nav className="nav-desktop" aria-label="Primary">
            <ul className="desktop-links">
              {menuItems.map((m) => renderItem(m, { mobile: false }))}
            </ul>
          </nav>

          <button className="mobile-toggle mobile-open" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(true)}>
            ☰
          </button>
        </div>

        <div className={`mobile-sidebar ${open ? "open" : ""}`}>
          <div className="sidebar-content">
            <button className="mobile-toggle mobile-close" aria-expanded={!open} aria-label="Close menu" onClick={() => setOpen(false)}>
              ✕
            </button>

            <Link href="/" onClick={() => setOpen(false)}>
              <img className="logo" src="/furr_baby_logo.svg" alt="Furr Baby" />
            </Link>

            <ul className="nav-links mobile-nav" role="menu" aria-label="Mobile primary">
              {isLoggedIn && <li className="user-welcome"><div className="user-info">Welcome, {user?.name}</div></li>}
              {menuItems.map((m) => renderItem(m, { mobile: true }))}
            </ul>
          </div>
        </div>
      </div>

      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
      <ForgotPasswordModal show={showForgotPassword} onHide={() => setShowForgotPassword(false)} />
      <RegisterModal show={showRegister} onHide={() => setShowRegister(false)} />
      <AskLoginModal show={showAskLogin} onHide={() => setShowAskLogin(false)} />
    </header>
  );
};

export default Header;
