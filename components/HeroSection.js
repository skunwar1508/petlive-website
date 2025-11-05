"use client";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
    const { user, logout, isLoggedIn, showLogin, setShowLogin, showRegister, setShowRegister } = useAppContext();

    const handleNavigation = (path) => {
      if (isLoggedIn) {
        router.push(path);
      } else {
        setShowLogin(true);
      }
    };
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-md-7 text-col">
            <div>
              <h1 className="heading-primary">
                Where Pets Find Love,
                <br /> Care & Community
              </h1>
              <p>
                India’s first all-in-one platform to consult vets online,
                <br /> join pet lover communities,
                <br /> and even find your pet’s perfect playdate.
              </p>
              <div className="btns-container">
                <button
                  className="btn cta-btn"
                  onClick={() => handleNavigation("/community")}
                >
                  Explore Our Community
                </button>
                <button
                  className="btn cta-btn"
                  onClick={() => handleNavigation("/blogs")}
                >
                  Read Our Blog
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-5 image-col">
            <div className="blob-wrapper">
              <img
                src="/images/cat_dog_hero.png"
                alt="Pets"
                className="blob-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
